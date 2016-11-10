(function() {

  /* @ngInject */
  function controller(callService) {

    this.isAudio = true
    this.areOptions = false
    this.isTypingMessage = false

    this.toggleAudio = () => {
      callService.toggleAudio()
      this.isAudio = !this.isAudio
    }

    this.toggleVideo = () => {
      callService.toggleVideo()
      this.isVideo = !this.isVideo
    }

    this.toggleOptions = () => {
      this.areOptions = !this.areOptions
    }

    this.toggleMessenger = () => {
      this.isMessenger = !this.isMessenger
    }

    return this
  }

  let communicatorNav = {
    templateUrl:    'components/communicator/communicator-maximized/navigation/navigation.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      minimizeCommunicator: '=',
      hangupCall: '=',
      isVideo: '=',
      isMessenger: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.navigation', [
    'pascalprecht.translate',
    'profitelo.services.call'
  ])
    .component('communicatorNav', communicatorNav)

}())
