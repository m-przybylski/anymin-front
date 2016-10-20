(function() {

  /* @ngInject */
  function controller($timeout, $rootScope, currentCallSessionService, DialogService, $scope) {
    
    this.chatMinimize = false
    this.disconnected = !$rootScope.callSession
    this.closed = false

    this.minimizeChatComponent = () => {
      this.chatMinimize = !this.chatMinimize
    }
    
    $scope.disconnectCall = () => {
      this.disconnected = true
      $timeout(() => {
        this.closed = true
        currentCallSessionService.removeSession()
      }, 400)
    }
        
    this.openDisconnectModal = () => {
      DialogService.openDialog({
        scope: $scope,
        controller: 'clientCallController',
        templateUrl: 'controllers/communicator/client-call/client-call.tpl.html'
      })
    }

    return this
  }

  let communicator = {
    transclude: true,
    templateUrl:    'components/communicator/communicator.tpl.html',
    controller: controller,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.communicator', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.services.current-call-state',
    'profitelo.services.dialog-service',
    'profitelo.common.controller.communicator.client-call',
    'profitelo.components.communicator.communicator-connecting',
    'profitelo.components.communicator.communicator-nav',
    'profitelo.components.communicator.communicator-minimize',
    'profitelo.services.pro-ratel-service',
    'profitelo.services.current-call-state'

  ])
    .component('communicator', communicator)

}())
