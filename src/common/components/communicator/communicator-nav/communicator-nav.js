(function() {

  /* @ngInject */
  function controller() {

    this.isActive = {
      microphoneDisabled: false,
      cameraDisabled: false,
      optionsToggled: false,
      chatSwitcher: false
    }

    this.minimizeChat = () => {
      this.chatMinimize()
    }

    this.disconnectConversations = () => {
      this.conversationDisconnect()
    }

    this.microphoneSwitcher = () => {
      this.isActive.microphoneDisabled = !this.isActive.microphoneDisabled
    }

    this.cameraSwitcher = () => {
      this.isActive.cameraDisabled = !this.isActive.cameraDisabled
    }

    this.optionsToggled = () => {
      this.isActive.optionsToggled = !this.isActive.optionsToggled
    }

    this.chatSwitcher = () => {
      this.isActive.chatSwitcher = !this.isActive.chatSwitcher
    }

    return this
  }

  let communicatorNav = {
    transclude: true,
    templateUrl:    'components/communicator/communicator-nav/communicator-nav.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      chatMinimize: '=?',
      conversationDisconnect: '=?'
    }
  }

  angular.module('profitelo.components.communicator.communicator-nav', [
    'pascalprecht.translate',
    'c7s.ng.userAuth'

  ])
    .component('communicatorNav', communicatorNav)

}())
