(function() {

  let proVideoPreview = {
    transclude: true,
    templateUrl:    'components/communicator/pro-videochat/pro-video-preview/pro-video-preview.tpl.html'
  }

  angular.module('profitelo.components.communicator.pro-videochat.pro-video-preview', [
    'pascalprecht.translate'

  ])
  .component('proVideoPreview', proVideoPreview)

}())
