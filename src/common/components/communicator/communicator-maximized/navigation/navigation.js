(function() {

  /* @ngInject */
  function controller(callService) {
    this.isAudio = true
    this.isMessenger = false
    this.areOptions = false

    this.animateButtons = (event) => {
      if (event.currentTarget.classList.contains('is-active')) {
        event.currentTarget.classList.add('is-inactive')
        event.currentTarget.classList.remove('is-active')
      } else {
        event.currentTarget.classList.remove('is-inactive')
        event.currentTarget.classList.add('is-active')
      }
    }

    this.toggleAudio = (buttonId) => {
      callService.toggleAudio()
      this.animateButtons(buttonId)
      this.isAudio = !this.isAudio
    }

    this.toggleVideo = (buttonId) => {
      callService.toggleVideo()
      this.animateButtons(buttonId)
      this.isVideo = !this.isVideo
    }

    this.toggleOptions = (buttonId) => {
      this.animateButtons(buttonId)
      this.areOptions = !this.areOptions
    }

    this.toggleMessenger = (buttonId) => {
      this.animateButtons(buttonId)
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
