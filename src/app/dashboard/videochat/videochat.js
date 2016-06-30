(function() {

  angular.module('profitelo.controller.dashboard.videochat', [
    'ui.router',
    'profitelo.components.pro-videochat',
    'c7s.ng.userAuth'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.videochat', {
        url: '/videochat',
        templateUrl: 'dashboard/videochat/videochat.tpl.html',
        data          : {
          access : UserRolesProvider.getAccessLevel('user')
        }
      })
    })

}())
