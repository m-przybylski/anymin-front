(function() {


  function communicatorController() {

    return this
  }

  function config($stateProvider) {
    $stateProvider.state('app.dashboard.conversation-audio', {
      url: '/communicator-audio',
      controllerAs: 'vm',
      controller: 'communicatorController',
      templateUrl: 'dashboard/conversation-audio/conversation-audio.tpl.html'
    })
  }

  angular.module('profitelo.controller.dashboard.conversation-audio', [
    'c7s.ng.userAuth',
    'ui.router',
    'profitelo.components.communicator',
    'profitelo.components.communicator.communicator-nav'
  ])
    .config(config)
    .controller('communicatorController', communicatorController)

}())
