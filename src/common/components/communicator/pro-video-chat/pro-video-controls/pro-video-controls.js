(function() {

  function controller() {

    this.isMuted = false
    this.isVideoHidden = false

    this.endCall = () => {
      this.session.hangup()
    }
    
    this.mute = () => {
      this.isMuted = this.session.mute()
    }

    this.stopVideo = () => {
      this.isVideoHidden = this.session.stopVideo()
    }

    return this
  }

  let proVideoControls = {
    transclude: true,
    templateUrl:    'components/communicator/pro-video-chat/pro-video-controls/pro-video-controls.tpl.html',
    bindings: {
      session: '=',
      toggles: '='
    },
    controllerAs: 'vm',
    controller: controller
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-controls', [
    'pascalprecht.translate'

  ])
  .component('proVideoControls', proVideoControls)

}())
