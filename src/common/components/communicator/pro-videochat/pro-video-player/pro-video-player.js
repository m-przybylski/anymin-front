(function() {

  let proVideoPlayer = {
    transclude: true,
    templateUrl:    'components/communicator/pro-videochat/pro-video-player/pro-video-player.tpl.html'
  }

  angular.module('profitelo.components.communicator.pro-videochat.pro-video-player', [
    'pascalprecht.translate'

  ])
  .component('proVideoPlayer', proVideoPlayer)

}())
