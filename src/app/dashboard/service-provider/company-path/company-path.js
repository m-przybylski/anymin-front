(function() {
  function CompanyPathController($scope, ProfileApi, savedProfile) {
    let vm = this

    let _updateMethod

    if (savedProfile) {
      _updateMethod = ProfileApi.putProfile
    } else {
      _updateMethod = ProfileApi.postProfile
    }


    vm.companyPathModel = {}

    vm.queue = {
      amountOfSteps: 6,
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


  angular.module('profitelo.controller.dashboard.service-provider.company-path', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-name',
    'profitelo.directives.service-provider.pro-service-provider-description',
    'profitelo.directives.service-provider.pro-service-provider-languages',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.company-path', {
      url:          '/company-path',
      templateUrl:  'dashboard/service-provider/company-path/company-path.tpl.html',
      controller:   'CompanyPathController',
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
  .controller('CompanyPathController', CompanyPathController)

}())
