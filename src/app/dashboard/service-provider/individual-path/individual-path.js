(function() {
  function IndividualPathController($scope, $state, ProfileApi, User, savedProfile, proTopAlertService, $timeout, smoothScrolling) {
    let vm = this


    vm.queue = {
      amountOfSteps: 7,
      currentStep: 2,
      completedSteps: 1,
      skippedSteps: {}
    }
    vm.individualPathModel = {
      name: null,
      description:  null,
      avatar:  null,
      languages:  [],
      files:  [],
      links:  []
    }

    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }

    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)

    if (savedProfile && savedProfile.expertDetails) {
      vm.individualPathModel = savedProfile.expertDetails
      vm.queue = {
        amountOfSteps: 7,
        currentStep: 8,
        completedSteps: 7,
        skippedSteps: {}
      }
      vm.inEditMode = true
    } else {
      vm.inEditMode = false
      $timeout(()=>{
        smoothScrolling.scrollTo(vm.queue.currentStep)
      })
    }

    vm.saveAccountObject = () => {

      let _updateMethod
      if (savedProfile) {
        _updateMethod = ProfileApi.putProfile
      } else {
        _updateMethod = ProfileApi.postProfile
      }

      _updateMethod({
        id: User.getData('id'),
        expertDetails: {
          name: vm.individualPathModel.name,
          description: vm.individualPathModel.description,
          avatar: vm.individualPathModel.avatar,
          languages: vm.individualPathModel.languages,
          files: vm.individualPathModel.files,
          links: vm.individualPathModel.links
        }
      }).$promise.then(() => {
        $state.go('app.dashboard.service-provider.consultation-range')
      }, () => {
        proTopAlertService.error({
          message: 'error',
          timeout: 4
        })
      })
    }
    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.individual-path', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.services.smooth-scrolling',
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
    'profitelo.directives.pro-progress-bar',
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider.individual-path', {
      url:          '/individual-path',
      templateUrl:  'dashboard/service-provider/individual-path/individual-path.tpl.html',
      controller:   'IndividualPathController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($q, $state, ProfileApi, User) => {

          let _deferred = $q.defer()
          User.getStatus().then(() => {
            ProfileApi.getProfile({
              profileId: User.getData('id')
            }).$promise.then((response) => {
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(null)
            })
          }, (error) => {
            $state.go('app.dashboard')
            proTopAlertService.error({
              message: 'error',
              timeout: 4
            })
          })

          return _deferred.promise
        }
      },
      data: {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.INDIVIDUAL_PATH'
      }
    })
  })
  .controller('IndividualPathController', IndividualPathController)

}())
