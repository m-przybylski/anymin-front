(function() {

  /* @ngInject */
  function controller(callService) {

    this.isAudio = true
    this.isMessenger = false
    this.areOptions = false

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

    this.hangupCall = () =>
      callService.hangupCall()

    return this
  }

  let communicatorNav = {
    templateUrl:    'components/communicator/communicator-maximized/navigation/navigation.tpl.html',
    controller: controller,
    controllerAs: 'vm',
    bindings: {
      minimizeCommunicator: '=',
      isVideo: '='
    }
  }

  angular.module('profitelo.components.communicator.communicator-maximized.navigation', [
    'pascalprecht.translate',
    'profitelo.services.call'
  ])
    .component('communicatorNav', communicatorNav)

}())
