
(function() {

  function ModalsController() {

  }


  angular.module('profitelo.controller.dashboard.modals', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
  .config(function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.modals', {
      url:          '/modals',
      templateUrl:     'dashboard/modals/modals.tpl.html',
      controller:   'ModalsController',
      controllerAs: 'vm',
      data          : {
        access : UserRolesProvider.getAccessLevel('public')
      }
    })
  })
  .controller('ModalsController', ModalsController)

}())
