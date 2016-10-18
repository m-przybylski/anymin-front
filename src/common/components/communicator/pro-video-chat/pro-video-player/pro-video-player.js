(function() {

  /* @ngInject */
  function controller($element, communicatorService) {

    communicatorService.bindRemoteStreamElement($($element).find('video'))

  }

  let proVideoPlayer = {
    templateUrl: 'components/communicator/pro-video-chat/pro-video-player/pro-video-player.tpl.html',
    controller: controller,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-player', [
    'pascalprecht.translate',
    'profitelo.services.communicatorService'

  ])
    .component('proVideoPlayer', proVideoPlayer)

}())
