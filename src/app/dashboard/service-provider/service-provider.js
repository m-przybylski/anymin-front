(function() {
  function ServiceProviderController() {
    let vm = this

    return vm
  }


  angular.module('profitelo.controller.dashboard.service-provider', [
    'ui.router',
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