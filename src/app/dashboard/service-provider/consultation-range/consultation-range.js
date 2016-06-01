(function() {
  function ConsultationRangeController($scope, ProfileApi, savedProfile) {
    let vm = this

    vm.costModel = {}

    vm.queue = {
      amountOfSteps: 3,
      currentStep: 1,
      completedSteps: 0,
      skippedSteps: {}
    }

    vm.currency = [
      {id: 1, name: 'PLN'},
      {id: 2, name: 'USD'},
      {id: 3, name: 'EUR'}
    ]

    let _calculateProgressPercentage = () => {
      vm.progressBarWidth = Math.ceil(vm.queue.completedSteps / vm.queue.amountOfSteps * 100)
    }
    _calculateProgressPercentage()

    $scope.$watch(() => {
      return vm.queue.completedSteps
    }, _calculateProgressPercentage)

    vm.saveAccountObject = () => {


    }

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.consultation-range', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-bottom-summary-row',
    'profitelo.directives.service-provider.pro-service-provider-cost',
    'profitelo.swaggerResources',
    'profitelo.directives.service-provider.pro-service-provider-tags',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
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
      },
      data: {
        access : UserRolesProvider.getAccessLevel('user'),
        pageTitle: 'PAGE_TITLE.DASHBOARD.SERVICE_PROVIDER.CONSULTATION_RANGE'
      }
    })
  })
  .controller('ConsultationRangeController', ConsultationRangeController)

}())
