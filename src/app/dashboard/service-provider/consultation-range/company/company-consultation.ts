import * as angular from "angular"
import apiModule from "profitelo-api-ng/api.module"
import {ServiceApi, ProfileApi} from "profitelo-api-ng/api/api"
import {GetProfileWithServices, Tag, GetOrganizationProfile} from "profitelo-api-ng/model/models"
import {DialogService} from "../../../../../common/services/dialog/dialog.service"
import {TopAlertService} from "../../../../../common/services/top-alert/top-alert.service"
import {ServiceProviderService} from "../../../../../common/services/service-provider/service-provider.service"
import {UserService} from "../../../../../common/services/user/user.service"
import userModule from "../../../../../common/services/user/user"
import {IServiceProviderImageService} from "../../../../../common/resolvers/service-provider-image/service-provider-image.service"
import topAlertModule from "../../../../../common/services/top-alert/top-alert"
import dialogModule from "../../../../../common/services/dialog/dialog"

import "common/controllers/accept-reject-dialog-controller/accept-reject-dialog-controller"
import "common/resolvers/service-provider-image/service-provider-image.service"
import "common/directives/service-provider/pro-bottom-summary-row/pro-bottom-summary-row"
import "common/directives/service-provider/pro-bottom-consultation-button/pro-bottom-consultation-button"
import "common/directives/service-provider/pro-service-provider-cost/pro-service-provider-cost"
import "common/directives/service-provider/pro-service-provider-who-provides/pro-service-provider-who-provides"
import "common/directives/service-provider/pro-service-provider-tags/pro-service-provider-tags"
import "common/directives/service-provider/pro-service-provider-profile/pro-service-provider-profile"
import "common/directives/interface/pro-alert/pro-alert"
import serviceProviderModule from "../../../../../common/services/service-provider/search-provider"

/* @ngInject */
function CompanyConsultationController($log: ng.ILogService, $scope: ng.IScope, $state: ng.ui.IStateService,
                                       dialogService: DialogService, savedProfile: GetProfileWithServices,
                                       ServiceApi: ServiceApi,
                                       topAlertService: TopAlertService, profileImage: string,
                                       lodash: _.LoDashStatic, serviceProviderService: ServiceProviderService) {

  this.costModel = serviceProviderService.createDefaultModel(0)
  this.editModel = serviceProviderService.createDefaultModel(0)

  this.queue = serviceProviderService.createDefaultQueue(4, 1, 0)
  this.editQueue = serviceProviderService.createDefaultQueue(4, 5, 4)

  this.currency = [
    {id: 1, name: 'PLN'},
    {id: 2, name: 'USD'},
    {id: 3, name: 'EUR'}
  ]

  this.profile = savedProfile.organizationDetails
  this.consultations = savedProfile.services
  this.profileImage = profileImage

  let _postConsultationMethod = (callback: Function) => {
    ServiceApi.postServiceRoute({
      details: {
        name: this.costModel.name,
        tags: this.costModel.tags,
        price: {
          amount: parseInt(this.costModel.cost, 10),
          currency: this.costModel.currency
        }
      },
      ownerEmployee: this.ownerEmployee,
      invitations: this.costModel.invitations
    }).then((_res) => {

      if (typeof callback === 'function') {
        callback()
      }
    }, (err) => {
      $log.error(err)
      topAlertService.error({
        message: 'error',
        timeout: 4
      })
    })
  }

  let _calculateProgressPercentage = () => {
    this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
  }
  _calculateProgressPercentage()

  $scope.$watch(() => {
    return this.queue.completedSteps
  }, _calculateProgressPercentage)


  this.backToFirstStep = () => {
    serviceProviderService.backToFirstStep(savedProfile.expertDetails, savedProfile.organizationDetails)
  }


  this.saveConsultationObject = () => {
    let _redirectByOwnerEmployeeStatus = () => {
      if ((!!lodash.find(this.consultations, {'ownerEmployee': true}) || !!this.ownerEmployee) && !savedProfile.expertDetails) {
        $state.go('app.dashboard.service-provider.individual-path')
      } else {
        $state.go('app.dashboard.service-provider.summary.company')
      }
    }

    if (this.queue.completedSteps === this.queue.amountOfSteps) {
      _postConsultationMethod(_redirectByOwnerEmployeeStatus)
    } else {
      _redirectByOwnerEmployeeStatus()
    }

  }

  this.isConsultationPresent = () => {
    return this.consultations.length > 0
  }

  this.editConsultation = (id: string, name: string, price: number, tags: Array<Tag>,
                           invitations: Array<GetOrganizationProfile>, ownerEmployee: boolean) => {
    this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
    this.editQueue = {
      amountOfSteps: 4,
      currentStep: 5,
      completedSteps: 4,
      skippedSteps: {}
    }
    this.editModel = {
      name: name,
      tags: tags,
      cost: price,
      invitations: invitations
    }
    this.ownerEmployee = ownerEmployee
    this.updateConsultation = () => {

      ServiceApi.putServiceRoute(id, {
        details: {
          name: this.editModel.name,
          tags: this.editModel.tags,
          price: {
            amount: parseInt(this.editModel.cost, 10),
            currency: this.editModel.currency
          }
        },
        ownerEmployee: this.ownerEmployee,
        invitations: this.editModel.invitations
      }).then(() => {
        $state.reload()
      }, (err) => {
        $log.error(err)
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }
  }
  this.deleteConsultation = (id: string, index: number) => {

    ((serviceId, localIndex) => {
      let _id = serviceId
      let _index = localIndex

      this.modalCallback = () => {
        ServiceApi.deleteServiceRoute(_id).then((_res) => {
          this.consultations.splice(_index, 1)
        }, (err: any) => {
          $log.error(err)
          topAlertService.error({
            message: 'error',
            timeout: 4
          })
        })
      }
    })(id, index)

    dialogService.openDialog({
      scope: $scope,
      controller: 'acceptRejectDialogController',
      template: require('common/controllers/accept-reject-dialog-controller/accept-reject-dialog-controller.pug')()
    })
  }

  this.addAnotherConsultation = () => {
    _postConsultationMethod($state.reload)
  }


  return this
}

angular.module('profitelo.controller.dashboard.service-provider.consultation-range.company', [
  'ui.bootstrap',
  'ui.router',
  'ngLodash',
  userModule,
  dialogModule,
  apiModule,
  topAlertModule,
  serviceProviderModule,
  'profitelo.common.controller.accept-reject-dialog-controller',
  'profitelo.resolvers.service-provider-image',
  'profitelo.directives.service-provider.pro-bottom-summary-row',
  'profitelo.directives.service-provider.pro-service-provider-cost',
  'profitelo.directives.service-provider.pro-service-provider-who-provides',
  'profitelo.directives.service-provider.pro-service-provider-tags',
  'profitelo.directives.service-provider.pro-bottom-consultation-button',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.service-provider.pro-service-provider-profile'
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider.consultation-range.company', {

      url: '/company',
      template: require('./company-consultation.pug')(),
      controller: 'CompanyConsultationController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: ProfileApi,
                       lodash: _.LoDashStatic, userService: UserService, ServiceApi: ServiceApi, topAlertService: TopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer<GetProfileWithServices | null>()
          /* istanbul ignore next */
          userService.getUser().then((user) => {
            ProfileApi.getProfileWithServicesRoute(user.id).then((profileWithServices) => {

              ServiceApi.postServicesTagsRoute({
                serviceIds: lodash.map(profileWithServices.services, service => service.id)
              }).then((servicesTags) => {
                profileWithServices.services.forEach((service) => {
                  // FIXME remove any
                  (<any>service.details).tags = lodash.head(
                    lodash.filter(servicesTags, (serviceTags) => service.id === serviceTags.serviceId)).tags
                })
                _deferred.resolve(profileWithServices)
              })
            }, () => {
              _deferred.resolve(null)
            }, (error: any) => {
              _deferred.reject(error)
              $state.go('app.dashboard')
              topAlertService.error({
                message: 'error',
                timeout: 4
              })
            })
          }, (error: any) => {
            $log.error(error)
            $state.go('app.dashboard')
            topAlertService.error({
              message: 'error',
              timeout: 4
            })
          })
          /* istanbul ignore next */
          return _deferred.promise
        },
        /* istanbul ignore next */
        profileImage: (ServiceProviderImageResolver: IServiceProviderImageService,
                       savedProfile: GetProfileWithServices | null, $q: ng.IQService) => {
          if (savedProfile && savedProfile.organizationDetails && savedProfile.organizationDetails.logo)
            return ServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
          else
            return $q.resolve('')
        }
      },
      data: {
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
        showMenu: false
      }
    })
  })
  .controller('CompanyConsultationController', CompanyConsultationController)
