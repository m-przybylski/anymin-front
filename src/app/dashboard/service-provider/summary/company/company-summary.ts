import * as angular from 'angular'
import {IFilterService} from '../../../../../common/services/filter/filter.service'
import apiModule from 'profitelo-api-ng/api.module'
import {ProfileApi, ServiceApi} from 'profitelo-api-ng/api/api'
import {GetProfileWithServices} from 'profitelo-api-ng/model/models'
import {TopAlertService} from '../../../../../common/services/top-alert/top-alert.service'
import {DialogService} from '../../../../../common/services/dialog/dialog.service'
import {CommunicatorService} from '../../../../../common/components/communicator/communicator.service'
import userModule from '../../../../../common/services/user/user'
import {UserService} from '../../../../../common/services/user/user.service'
import {IServiceProviderImageService}
from '../../../../../common/resolvers/service-provider-image/service-provider-image.service'
import dialogModule from '../../../../../common/services/dialog/dialog'
import communicatorModule from '../../../../../common/components/communicator/communicator'
import 'common/controllers/accept-reject-dialog-controller/accept-reject-dialog-controller'
import 'common/directives/service-provider/pro-service-provider-summary-step/pro-service-provider-summary-step'
import 'common/resolvers/service-provider-image/service-provider-image.service'
import 'common/directives/interface/pro-alert/pro-alert'
import 'common/directives/service-provider/pro-service-provider-profile/pro-service-provider-profile'
import * as _ from 'lodash'

/* @ngInject */
function CompanySummaryController($log: ng.ILogService, $state: ng.ui.IStateService, $scope: ng.IScope,
                                  $filter: IFilterService, savedProfile: GetProfileWithServices, ServiceApi: ServiceApi,
                                  topAlertService: TopAlertService, profileAvatar: string,
                                  companyLogo: string, dialogService: DialogService,
                                  communicatorService: CommunicatorService) {

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
    $state.go('app.dashboard.service-provider.consultation-range.company')
  }

  this.companyLogo = companyLogo
  this.profileAvatar = profileAvatar

  this.backToFirstStep = () => {
    $state.go('app.dashboard.service-provider.company-path')
  }

  this.goToExpertEdit = () => {
    $state.go('app.dashboard.service-provider.individual-path')
  }

  this.verifyProfile = () => {
    if (!!_.find(this.consultations, {'ownerEmployee': true}) && !savedProfile.expertDetails) {
      $state.go('app.dashboard.service-provider.individual-path')
    } else {
      ServiceApi.postServicesVerifyRoute().then((_res) => {
        $state.go('app.dashboard.client.favourites')
        communicatorService.authenticate()
        topAlertService.success({
          message: $filter('translate')('DASHBOARD.CREATE_PROFILE.SUMMARY_VERIFY'),
          timeout: 4
        })
      }, (err) => {
        $log.error(err)
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }
  }

  this.editConsultation = (id: string, name: string, price: number, tags: Array<any>, invitations: Array<any>,
                           ownerEmployee: boolean) => {
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
      }, (err: any) => {
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


angular.module('profitelo.controller.dashboard.service-provider.summary.company', [
  'ui.router',
  dialogModule,
  communicatorModule,
  userModule,
  apiModule,
  'profitelo.common.controller.accept-reject-dialog-controller',
  'profitelo.directives.service-provider.pro-service-provider-summary-step',
  'profitelo.resolvers.service-provider-image',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.service-provider.pro-service-provider-profile'
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider.summary.company', {
      url: '/company',
      template: require('./company-summary.pug')(),
      controller: 'CompanySummaryController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: ProfileApi,
                       userService: UserService, ServiceApi: ServiceApi, topAlertService: TopAlertService) => {

          /* istanbul ignore next */
          let _deferred = $q.defer<GetProfileWithServices>()
          /* istanbul ignore next */
          userService.getUser().then((user) => {
            ProfileApi.getProfileWithServicesRoute(user.id).then((profileWithServices) => {

              ServiceApi.postServicesTagsRoute({
                serviceIds: _.map(profileWithServices.services, service => service.id)
              }).then((servicesTags) => {

                profileWithServices.services.forEach((service) => {
                  (<any>service.details).tags = _.head(
                    _.filter(servicesTags, (serviceTags: any) => service.id === serviceTags.serviceId)).tags
                })
                _deferred.resolve(profileWithServices)
              })
            }, (err) => {
              _deferred.reject(err)
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
        companyLogo: (ServiceProviderImageResolver: IServiceProviderImageService,
                      savedProfile: GetProfileWithServices, $q: ng.IQService) => {
          /* istanbul ignore next */
          if (savedProfile.organizationDetails && savedProfile.organizationDetails.logo) {
            return ServiceProviderImageResolver.resolve(savedProfile.organizationDetails.logo)
          }
          else {
            return $q.resolve('')
          }
        },
        profileAvatar: (ServiceProviderImageResolver: IServiceProviderImageService,
                        savedProfile: GetProfileWithServices, $q: ng.IQService) => {
          /* istanbul ignore next */
          if (angular.isObject(savedProfile.expertDetails) && savedProfile.expertDetails.avatar) {
            return ServiceProviderImageResolver.resolve(savedProfile.expertDetails.avatar)
          }
          return $q.resolve('')
        }
      },
      data: {
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE',
        showMenu: false
      }
    })
  })
  .controller('CompanySummaryController', CompanySummaryController)
