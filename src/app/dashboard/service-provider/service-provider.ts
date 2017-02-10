(function() {
  function ServiceProviderController() {

    this.onClose = () =>{

    }

    return this
  }

  angular.module('profitelo.controller.dashboard.service-provider', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider: ng.ui.IStateProvider, UserRolesProvider: any) {
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
