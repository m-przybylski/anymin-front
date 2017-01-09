(function() {
  function ServiceProviderController($state) {

    this.onClose = () =>{

    }

    return this
  }

  angular.module('profitelo.controller.dashboard.service-provider', [
    'ui.router',
    'profitelo.services.service-provider-state',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.service-provider', {
      abstract:     true,
      url:          '/service-provider',
      templateUrl:  'dashboard/service-provider/service-provider.tpl.html',
      controller:   'ServiceProviderController',
      controllerAs: 'serviceProviderController',
      data: {
        access : UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('ServiceProviderController', ServiceProviderController)

}())
