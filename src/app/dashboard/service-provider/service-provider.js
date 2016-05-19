(function() {
  function ServiceProviderController() {
    let vm = this

    vm.profileTypes = {
      'INDIVIDUAL': 'INDIVIDUAL',
      'COMPANY': 'COMPANY'
    }


    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider', [
    'ui.router',
    'profitelo.directives.service-provider.pro-top-title-row',
    'profitelo.services.service-provider-state'
  ])
  .config( function($stateProvider) {
    $stateProvider.state('app.dashboard.service-provider', {
      abstract:     true,
      url:          '/service-provider',
      templateUrl:  'dashboard/service-provider/service-provider.tpl.html',
      controller:   'ServiceProviderController',
      controllerAs: 'serviceProviderController'
    })
  })
  .controller('ServiceProviderController', ServiceProviderController)

}())
