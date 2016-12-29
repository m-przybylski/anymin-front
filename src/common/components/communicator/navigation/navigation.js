(function() {

  /* @ngInject */
  function controller(callService) {
    this.isAudio = true
    this.isMessenger = false
    this.areOptions = false

    this.animateButtons = (elem) => {
      if (elem.currentTarget.classList.contains('is-active')) {
        elem.currentTarget.classList.add('is-inactive')
        elem.currentTarget.classList.remove('is-active')
      } else {
        elem.currentTarget.classList.remove('is-inactive')
        elem.currentTarget.classList.add('is-active')
      }
    }

    this.startAudio = (elem) => {
      callService.startAudio()
      this.animateButtons(elem)
      this.isAudio = true
    }

    this.stopAudio = (elem) => {
      callService.stopAudio()
      this.animateButtons(elem)
      this.isAudio = false
    }

    this.stopVideo = (elem) => {
      callService.stopVideo()
      this.animateButtons(elem)
      this.isVideo = false
    }

    this.startVideo = (elem) => {
      callService.startVideo()
      this.animateButtons(elem)
      this.isVideo = true
    }

    this.toggleOptions = (elem) => {
      this.animateButtons(elem)
      this.areOptions = !this.areOptions
    }

    this.toggleMessenger = (elem) => {
      this.animateButtons(elem)
      this.isMessenger = !this.isMessenger
    }

    this.hangupCall = callService.hangupCall

    return this
  }

  const component = {
    templateUrl:    'components/communicator/navigation/navigation.tpl.html',
    controller: controller,
    bindings: {
      isVideo: '=',
      isMessenger: '='
    }
  }

  angular.module('profitelo.components.communicator.navigation', [
    'pascalprecht.translate',
    'profitelo.services.call'
  ])
    .component('communicatorNav', component)

}())
