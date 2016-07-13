/* istanbul ignore next */
(function() {
  function videochatController() {
    
    return this
  }

  angular.module('profitelo.controller.dashboard.videochat', [
    'ui.router',
    'profitelo.components.pro-videochat',
    'profitelo.components.communicator.pro-text-chat',
    'c7s.ng.userAuth'
  ])
    .config( function($stateProvider, UserRolesProvider) {
      $stateProvider.state('app.dashboard.videochat', {
        url: '/videochat',
        templateUrl: 'dashboard/videochat/videochat.tpl.html',
        controller:   'videochatController',
        controllerAs: 'vm',
        data          : {
          access : UserRolesProvider.getAccessLevel('user')
        }
      })
    })
    .controller('videochatController', videochatController)
}())
