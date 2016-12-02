(function() {

  function DashboardStartController(User) {
    this.userId = User.getData('id')

    return this
  }


  angular.module('profitelo.controller.dashboard.start', [
    'ui.router',
    'c7s.ng.userAuth'
  ])
  .config( function($stateProvider, UserRolesProvider) {
    $stateProvider.state('app.dashboard.start', {
      url: '/start',
      templateUrl: 'dashboard/start/start.tpl.html',
      controller: 'DashboardStartController',
      controllerAs: 'vm',
      data          : {
        access : UserRolesProvider.getAccessLevel('user')
      }
    })
  })
  .controller('DashboardStartController', DashboardStartController)

}())
