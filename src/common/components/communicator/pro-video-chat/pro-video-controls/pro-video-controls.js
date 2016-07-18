(function() {

  let proVideoControls = {
    transclude: true,
    templateUrl:    'components/communicator/pro-video-chat/pro-video-controls/pro-video-controls.tpl.html'
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-controls', [
    'pascalprecht.translate'

  ])
  .component('proVideoControls', proVideoControls)

}())
