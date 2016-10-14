(function() {

  /* @ngInject */
  function controller($timeout) {
    this.chatMinimize = false
    this.disconnected = false
    this.closed = false

    this.minimizeChatComponent = () => {
      this.chatMinimize = !this.chatMinimize
    }

    this.connectionDisconnect = () => {
      this.disconnected = true
      
      $timeout(() => {
        this.closed = true
      }, 400)
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
    'profitelo.components.communicator.communicator-connecting',
    'profitelo.components.communicator.communicator-nav',
    'profitelo.components.communicator.communicator-minimize'

  ])
    .component('communicator', communicator)

}())
