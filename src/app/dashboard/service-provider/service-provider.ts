(function() {
  function ServiceProviderController() {

    this.onClose = () =>{

    }

    return this
  }

  angular.module('profitelo.controller.dashboard.service-provider', [
    'ui.router',
    'profitelo.services.session'
  ])
  .config( function($stateProvider: ng.ui.IStateProvider) {
    $stateProvider.state('app.dashboard.service-provider', {
      abstract:     true,
      url:          '/service-provider',
      templateUrl:  'dashboard/service-provider/service-provider.tpl.html',
      controller:   'ServiceProviderController',
      controllerAs: 'serviceProviderController',
      data: {
      }
    })
  })
  .controller('ServiceProviderController', ServiceProviderController)

}())
