namespace profitelo.dashboard.serviceProvider.individualPath {

  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import Profile = profitelo.models.Profile

  function IndividualPathController($scope: ng.IScope, $state: ng.ui.IStateService, ProfileApi: any, User: any,
                                    savedProfile: Profile, topAlertService: ITopAlertService,
                                    $timeout: ng.ITimeoutService, smoothScrollingService: ISmoothScrollingService) {

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

      let _updateMethod
      if (savedProfile) {
        _updateMethod = ProfileApi.patchProfile
      } else {
        _updateMethod = ProfileApi.postProfile
      }

      _updateMethod({
        id: User.getData('id'),
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
      }).$promise.then(() => {
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
    'profitelo.services.smooth-scrolling',
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
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'c7s.ng.userAuth'
  ])
    .config(function ($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
      $stateProvider.state('app.dashboard.service-provider.individual-path', {
        url: '/individual-path',
        templateUrl: 'dashboard/service-provider/individual-path/individual-path.tpl.html',
        controller: 'IndividualPathController',
        controllerAs: 'vm',
        resolve: {
          /* istanbul ignore next */
          savedProfile: ($log: ng.ILogService, $q: ng.IQService, $state: ng.ui.IStateService, ProfileApi: any,
                         User: any, topAlertService: ITopAlertService) => {
            /* istanbul ignore next */
            let _deferred = $q.defer<Profile | null>()
            /* istanbul ignore next */
            User.getStatus().then(() => {
              ProfileApi.getProfile({
                profileId: User.getData('id')
              }).$promise.then((response: Profile) => {
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
          access: UserRolesProvider.getAccessLevel('user'),
          pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.INDIVIDUAL_PATH',
          showMenu: false
        }
      })
    })
    .controller('IndividualPathController', IndividualPathController)
}
