import * as angular from "angular"
import {IFilterService} from "../../../../../common/services/filter/filter.service"
import apiModule from "profitelo-api-ng/api.module"
import {ServiceApi, ProfileApi} from "profitelo-api-ng/api/api"
import {GetProfileWithServices} from "profitelo-api-ng/model/models"
import {TopAlertService} from "../../../../../common/services/top-alert/top-alert.service"
import {DialogService} from "../../../../../common/services/dialog/dialog.service"
import {CommunicatorService} from "../../../../../common/components/communicator/communicator.service"
import {UserService} from "../../../../../common/services/user/user.service"
import {IServiceProviderImageService} from "../../../../../common/resolvers/service-provider-image/service-provider-image.service"
import dialogModule from "../../../../../common/services/dialog/dialog"
import communicatorModule from "../../../../../common/components/communicator/communicator"
import sessionModule from "../../../../../common/services/session/session"
import "common/controllers/accept-reject-dialog-controller/accept-reject-dialog-controller"
import "common/directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step"
import "common/resolvers/service-provider-image/service-provider-image.service"
import "common/directives/interface/pro-alert/pro-alert"
import "angular-mocks"

/* @ngInject */
function IndividualSummaryController($log: ng.ILogService, $state: ng.ui.IStateService, $scope: ng.IScope,
                                     $filter: IFilterService, savedProfile: GetProfileWithServices,
                                     ServiceApi: ServiceApi,
                                     topAlertService: TopAlertService, profileImage: string,
                                     dialogService: DialogService, communicatorService: CommunicatorService) {

  if (savedProfile && savedProfile.expertDetails && !savedProfile.organizationDetails) {
    this.profile = savedProfile.expertDetails
    this.consultations = savedProfile.services
  } else {
    this.profile = savedProfile.organizationDetails
    this.consultations = savedProfile.services
    if (savedProfile.expertDetails) {
      this.expertProfile = savedProfile.expertDetails
    }
  }

  if (angular.isDefined(savedProfile.services) && savedProfile.services.length < 1) {
    $state.go('app.dashboard.service-provider.consultation-range.individual')
  }

  this.profileImage = profileImage
  this.backToFirstStep = () => {
    if (savedProfile.expertDetails && !savedProfile.organizationDetails) {
      $state.go('app.dashboard.service-provider.individual-path')
    } else {
      $state.go('app.dashboard.service-provider.company-path')
    }
  }


  this.verifyProfile = () => {
    ServiceApi.postServicesVerifyRoute().then((_res) => {
      $state.go('app.dashboard.client.favourites')
      communicatorService.authenticate()
      topAlertService.success({
        message: $filter('translate')('DASHBOARD.CREATE_PROFILE.SUMMARY_VERIFY'),
        timeout: 4
      })
    }, (err: any) => {
      $log.error(err)
      topAlertService.error({
        message: 'error',
        timeout: 4
      })
    })
  }

  this.editConsultation = (id: string, name: string, price: number, tags: Array<any>) => {
    this.currentEditConsultationId = this.currentEditConsultationId === id ? -1 : id
    this.editQueue = {
      amountOfSteps: 3,
      currentStep: 4,
      completedSteps: 3,
      skippedSteps: {}
    }
    this.editModel = {
      name: name,
      tags: tags,
      cost: price
    }
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
        invitations: []
      }).then(() => {
        $state.reload()
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
          if (this.consultations.length === 0) {
            $state.go('app.dashboard.service-provider.consultation-range.company')
          }
        }, (err) => {
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

  return this
}


angular.module('profitelo.controller.dashboard.service-provider.summary.individual', [
  'ui.router',
  dialogModule,
  communicatorModule,
  sessionModule,
  apiModule,
  'profitelo.common.controller.accept-reject-dialog-controller',
  'profitelo.directives.service-provider.pro-service-provider-summary-step',
  'profitelo.resolvers.service-provider-image',
  'profitelo.directives.interface.pro-alert'
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider.summary.individual', {
      url: '/individual',
      template: require('./individual-summary.pug')(),
      controller: 'IndividualSummaryController',
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
                  (<any>service.details).tags = lodash.head(
                    lodash.filter(servicesTags, (serviceTags) => service.id === serviceTags.serviceId)).tags
                })
                _deferred.resolve(profileWithServices)
              })
            }, (err) => {
              _deferred.reject(err)
            }, (error) => {
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
        profileImage: (ServiceProviderImageResolver: IServiceProviderImageService,
                       savedProfile: GetProfileWithServices, $q: ng.IQService) => {
          /* istanbul ignore next */
          if (savedProfile.expertDetails) {
            return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar || '')
          }
          else {
            return $q.resolve('')
          }
        }
      },
      data: {
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
        showMenu: false
      }
    })
  })
  .controller('IndividualSummaryController', IndividualSummaryController)
