(function() {
  function IndividualPathController($scope, $state, ProfileApi, User, savedProfile, proTopAlertService) {
    let vm = this

    let _profileType = $scope.$parent.serviceProviderController.profileTypes['INDIVIDUAL']

    vm.individualPathModel = {}

    vm.queue = {
      amountOfSteps: 7,
      currentStep: 2,
      completedSteps: 1
    }
    
    vm.individualPathModel = {}

    vm.queue = {
      amountOfSteps: 7,
      currentStep: 2,
      completedSteps: 1
    }

    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }

    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)


    vm.saveAccountObject = () => {

      let _updateMethod

      if (savedProfile) {
        _updateMethod = ProfileApi.putProfile
      } else {
        _updateMethod = ProfileApi.postProfile
      }

      _updateMethod({
        id: User.getData('id'),
        type: _profileType,
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
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.individual-path', {
      url:          '/individual-path',
      templateUrl:  'dashboard/service-provider/individual-path/individual-path.tpl.html',
      controller:   'IndividualPathController',
      controllerAs: 'vm',
      resolve: {
        /* istanbul ignore next */
        savedProfile: ($q, ProfileApi, User) => {

          let _deferred = $q.defer()

          User.getStatus().then(() => {
            ProfileApi.getProfile({
              profileId: User.getData('id')
            }).$promise.then((response) => {
              _deferred.resolve(response)
            }, () => {
              _deferred.resolve(false)
            })
          }, (error) => {
            _deferred.reject(error)
          })

          return _deferred.promise
        }
      }
    })
  })
  .controller('IndividualPathController', IndividualPathController)

}())
