(function() {
  function ConsultationRangeController($scope, ProfileApi, savedProfile) {
    let vm = this

    let _updateMethod

    if (savedProfile) {
      _updateMethod = ProfileApi.putProfile
    } else {
      _updateMethod = ProfileApi.postProfile
    }


    vm.companyPathModel = {}

    vm.queue = {
      amountOfSteps: 3,
      currentStep: 1,
      completedSteps: 0
    }

    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)

    vm.saveAccountObject = () => {
      _updateMethod({
        id: User.getData('id'),
        type: 'COMPANY',
        expertDetails: {
          firstName: vm.individualPathModel.name,
          lastName: vm.individualPathModel.name,
          description: vm.individualPathModel.description
        }
      }
      )
    }

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.consultation-range', {
      url:          '/consultation-range',
      templateUrl:  'dashboard/service-provider/consultation-range/consultation-range.tpl.html',
      controller:   'ConsultationRangeController',
      controllerAs: 'vm',
      resolve: {
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
  .controller('ConsultationRangeController', ConsultationRangeController)

}())
