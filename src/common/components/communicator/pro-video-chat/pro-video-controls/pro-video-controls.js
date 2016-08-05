(function() {

  function controller() {

    console.log('controlls session', this.session)


    this.endCall = () => {
      this.session.hangup()
    }

    return this
  }

  let proVideoControls = {
    transclude: true,
    templateUrl:    'components/communicator/pro-video-chat/pro-video-controls/pro-video-controls.tpl.html',
    bindings: {
      toggles: '=',
      session: '='
    },
    controllerAs: 'vm',
    controller: controller
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-controls', [
    'pascalprecht.translate'

  ])
  .component('proVideoControls', proVideoControls)

}())
