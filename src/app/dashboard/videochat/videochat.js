(function() {
  function videochatController() {
    /* istanbul ignore next */
    this.showChat = false
    /* istanbul ignore next */
    this.onClick = ()=> {
      this.showChat = !this.showChat
    }
    /* istanbul ignore next */
    return this
  }

  angular.module('profitelo.controller.dashboard.videochat', [
    'ui.router',
    'profitelo.components.pro-videochat',
    'profitelo.components.pro-text-chat',
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
