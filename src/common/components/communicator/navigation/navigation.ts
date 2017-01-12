(function () {

  /* @ngInject */
  function controller(callService) {

    this.areOptions = false
    this.isAudio = true

    this.animateButtons = (elem) => {
      if (elem.currentTarget.classList.contains('is-active')) {
        elem.currentTarget.classList.add('is-inactive')
        elem.currentTarget.classList.remove('is-active')
      } else {
        elem.currentTarget.classList.remove('is-inactive')
        elem.currentTarget.classList.add('is-active')
      }
    }

    this.startAudio = () => {
      callService.startAudio()
      this.isAudio = true
    }

    this.stopAudio = () => {
      callService.stopAudio()
      this.isAudio = false
    }

    this.stopVideo = () => {
      callService.stopVideo()
      this.isVideo = false
    }

    this.startVideo = (elem) => {
      callService.startVideo()
      this.isVideo = true
      this.animateButtons(elem)
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

    this.$onInit = () => {
      this.isMessenger = false
    }

    return this
  }

  const component = {
    templateUrl: 'components/communicator/navigation/navigation.tpl.html',
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
