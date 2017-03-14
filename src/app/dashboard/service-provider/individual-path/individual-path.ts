import * as angular from "angular"
import apiModule from "profitelo-api-ng/api.module"
import {ProfileApi} from "profitelo-api-ng/api/api"
import {GetProfile, UpdateProfile} from "profitelo-api-ng/model/models"
import {TopAlertService} from "../../../../common/services/top-alert/top-alert.service"
import {SmoothScrollingService} from "../../../../common/services/smooth-scrolling/smooth-scrolling.service"
import userModule from "../../../../common/services/user/user"
import {UserService} from "../../../../common/services/user/user.service"
import topAlertModule from "../../../../common/services/top-alert/top-alert"
import smoothScrollingModule from "../../../../common/services/smooth-scrolling/smooth-scrolling"

import "common/directives/service-provider/pro-service-provider-avatar/pro-service-provider-avatar"
import "common/directives/service-provider/pro-service-provider-name/pro-service-provider-name"
import "common/directives/service-provider/pro-service-provider-description/pro-service-provider-description"
import "common/directives/service-provider/pro-service-external-links/pro-service-external-links"
import "common/directives/service-provider/pro-service-provider-languages/pro-service-provider-languages"
import "common/directives/service-provider/pro-service-provider-file-uploader/pro-service-provider-file-uploader"
import "common/directives/interface/pro-textarea/pro-textarea"
import "common/directives/interface/pro-tags-dropdown/pro-tags-dropdown"
import "common/directives/interface/pro-alert/pro-alert"
import "common/directives/interface/pro-input/pro-input"

/* @ngInject */
function IndividualPathController($scope: ng.IScope, $state: ng.ui.IStateService, ProfileApi: ProfileApi,
                                  savedProfile: GetProfile, topAlertService: TopAlertService,
                                  $timeout: ng.ITimeoutService, smoothScrollingService: SmoothScrollingService) {

  this.queue = {
    amountOfSteps: 7,
    currentStep: 2,
    completedSteps: 1,
    skippedSteps: {}
  }
  this.individualPathModel = {
    name: '',
    description: '',
    avatar: null,
    languages: [],
    files: [],
    links: []
  }

  this.hasProfile = false

  let _calculateProgressPercentage = () => {
    this.progressBarWidth = Math.ceil(this.queue.completedSteps / this.queue.amountOfSteps * 100)
  }

  _calculateProgressPercentage()

  $scope.$watch(() => {
    return this.queue.completedSteps
  }, _calculateProgressPercentage)

  if (savedProfile && savedProfile.expertDetails) {
    this.individualPathModel = savedProfile.expertDetails
    this.queue = {
      amountOfSteps: 7,
      currentStep: 8,
      completedSteps: 7,
      skippedSteps: {}
    }
    this.inEditMode = true
  } else {
    this.inEditMode = false
    $timeout(() => {
      smoothScrollingService.scrollTo(this.queue.currentStep)
    })
  }

  if (angular.isObject(savedProfile)) {
    this.hasProfile = true
  }

  this.saveAccountObject = () => {

    let _updateMethod: (body: UpdateProfile) => ng.IHttpPromise<{}>

    if (savedProfile) {
      _updateMethod = ProfileApi.patchProfileRoute
    } else {
      _updateMethod = ProfileApi.postProfileRoute
    }

    _updateMethod({
      expertDetails: {
        name: this.individualPathModel.name,
        description: this.individualPathModel.description,
        avatar: this.individualPathModel.avatar,
        languages: this.individualPathModel.languages,
        files: this.individualPathModel.files.map((file: any) => {
          return {token: file.token, previews: file.previews}
        }),
        links: this.individualPathModel.links
      }
    }).then(() => {
      if (savedProfile && savedProfile.organizationDetails) {
        $state.go('app.dashboard.service-provider.summary.company')
      } else {
        $state.go('app.dashboard.service-provider.consultation-range.individual')
      }

    }, () => {
      topAlertService.error({
        message: 'error',
        timeout: 4
      })
    })
  }

  return this
}

angular.module('profitelo.controller.dashboard.service-provider.individual-path', [
  'ui.router',
  smoothScrollingModule,
  'profitelo.directives.service-provider.pro-service-provider-name',
  'profitelo.directives.service-provider.pro-service-provider-description',
  'profitelo.directives.service-provider.pro-service-external-links',
  'profitelo.directives.service-provider.pro-service-provider-languages',
  'profitelo.directives.service-provider.pro-service-provider-file-uploader',
  'profitelo.directives.service-provider.pro-service-provider-avatar',
  'profitelo.directives.interface.pro-textarea',
  'profitelo.directives.interface.pro-tags-dropdown',
  'profitelo.directives.interface.pro-alert',
  'profitelo.directives.interface.pro-input',
  apiModule,
  topAlertModule,
  userModule
])
  .config(function ($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider.individual-path', {
      url: '/individual-path',
      template: require('./individual-path.jade')(),
      controller: 'IndividualPathController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
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
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.INDIVIDUAL_PATH',
        showMenu: false
      }
    })
  })
  .controller('IndividualPathController', IndividualPathController)
