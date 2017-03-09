import * as angular from "angular"
import "angular-ui-router"
import {GetProfile} from "../../../../common/api/model/GetProfile"
import {UpdateProfile} from "../../../../common/api/model/UpdateProfile"
import {SmoothScrollingService} from "../../../../common/services/smooth-scrolling/smooth-scrolling.service"
import {TopAlertService} from "../../../../common/services/top-alert/top-alert.service"
import {ProfileApi} from "../../../../common/api/api/ProfileApi"
import userModule from "../../../../common/services/user/user"
import {UserService} from "../../../../common/services/user/user.service"
import apiModule from "../../../../common/api/api.module"
import topAlertModule from "../../../../common/services/top-alert/top-alert"
import "common/directives/service-provider/pro-service-provider-name/pro-service-provider-name"
import "common/directives/service-provider/pro-service-provider-description/pro-service-provider-description"
import "common/directives/service-provider/pro-service-provider-languages/pro-service-provider-languages"
import "common/directives/service-provider/pro-bottom-summary-row/pro-bottom-summary-row"
import "common/directives/service-provider/pro-service-provider-avatar/pro-service-provider-avatar"

/* @ngInject */
function CompanyPathController($scope: ng.IScope, $state: ng.ui.IStateService, ProfileApi: ProfileApi,
                               savedProfile: GetProfile | null, topAlertService: TopAlertService,
                               $timeout: ng.ITimeoutService, smoothScrollingService: SmoothScrollingService) {

  let _updateMethod: (body: UpdateProfile) => any
  if (savedProfile) {
    _updateMethod = ProfileApi.patchProfileRoute
  } else {
    _updateMethod = ProfileApi.postProfileRoute
  }

  this.companyPathModel = {
    name: '',
    logo: null,
    description: '',
    files: [],
    links: []
  }

  this.queue = {
    amountOfSteps: 6,
    currentStep: 2,
    completedSteps: 1,
    skippedSteps: {}
  }

  if (savedProfile && savedProfile.organizationDetails) {
    this.companyPathModel = savedProfile.organizationDetails
    this.queue = {
      amountOfSteps: 6,
      currentStep: 7,
      completedSteps: 6,
      skippedSteps: {}
    }
    this.inEditMode = true
  } else {
    this.inEditMode = false
    $timeout(() => {
      smoothScrollingService.scrollTo(this.queue.currentStep)
    })
  }

  let _calculateProgressPercentage = () => {
    this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
  }
  _calculateProgressPercentage()

  $scope.$watch(() => {
    return this.queue.completedSteps
  }, _calculateProgressPercentage)

  this.saveAccountObject = () => {
    _updateMethod({
      organizationDetails: {
        name: this.companyPathModel.name,
        logo: this.companyPathModel.logo,
        description: this.companyPathModel.description,
        files: this.companyPathModel.files.map((file: any) => {
          return {token: file.token, previews: file.previews}
        }),
        links: this.companyPathModel.links
      }
    }).then(() => {
      $state.go('app.dashboard.service-provider.consultation-range.company')
    }, () => {
      topAlertService.error({
        message: 'error',
        timeout: 4
      })
    })
  }


  return this
}


angular.module('profitelo.controller.dashboard.service-provider.company-path', [
  'ui.router',
  'profitelo.directives.service-provider.pro-service-provider-name',
  'profitelo.directives.service-provider.pro-service-provider-description',
  'profitelo.directives.service-provider.pro-service-provider-languages',
  'profitelo.directives.service-provider.pro-bottom-summary-row',
  'profitelo.directives.service-provider.pro-service-provider-avatar',
  apiModule,
  topAlertModule,
  userModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider.company-path', {
      url: '/company-path',
      template: require('./company-path.jade')(),
      controller: 'CompanyPathController',
      controllerAs: 'vm',
      resolve: {
        savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: ProfileApi,
                       userService: UserService, topAlertService: TopAlertService) => {
          /* istanbul ignore next */
          let _deferred = $q.defer<GetProfile | null>()
          /* istanbul ignore next */
          userService.getUser().then((user) => {
            ProfileApi.getProfileRoute(user.id).then((response) => {
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(null)
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
        }
      },
      data: {
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.COMPANY_PATH',
        showMenu: false
      }
    })
  })
  .controller('CompanyPathController', CompanyPathController)
