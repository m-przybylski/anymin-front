(function() {
  function IndividualPathController(serviceProviderStateService) {
    let vm = this

    vm.amountOfSteps = 7

    vm.progress = 0

    vm.individualPathModel = {}

    vm.queue = {
      currentActiveSection: 2,
      sectionBeingEdited:   -1
    }

    vm.nextSection = () => {
      vm.queue.currentActiveSection++
    }


    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.individual-path', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'profitelo.directives.service-provider.pro-service-provider-name',
    'profitelo.directives.service-provider.pro-service-provider-description'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.individual-path', {
      url:          '/individual-path',
      templateUrl:  'dashboard/service-provider/individual-path/individual-path.tpl.html',
      controller:   'IndividualPathController',
      controllerAs: 'vm'
    })
  })
  .controller('IndividualPathController', IndividualPathController)

}())