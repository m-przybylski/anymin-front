(function() {
  function CompanyPathController(serviceProviderStateService) {
    let vm = this

    vm.amountOfSteps = 8

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider.company-path', [
    'ui.router',
    'profitelo.services.service-provider-state'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider.company-path', {
      url:          '/company-path',
      templateUrl:  'dashboard/service-provider/company-path/company-path.tpl.html',
      controller:   'CompanyPathController',
      controllerAs: 'vm'
    })
  })
  .controller('CompanyPathController', CompanyPathController)

}())