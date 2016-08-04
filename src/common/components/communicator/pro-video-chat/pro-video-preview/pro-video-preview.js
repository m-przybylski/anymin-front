(function() {

  /* @ngInject */
  function controller($element, proRatelService) {

    proRatelService.bindLocalStreamElement($($element).find('video'))
    
  }

  let proVideoPreview = {
    templateUrl: 'components/communicator/pro-video-chat/pro-video-preview/pro-video-preview.tpl.html',
    controller: controller,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-preview', [
    'pascalprecht.translate',
    'profitelo.services.pro-ratel-service'

  ])
    .component('proVideoPreview', proVideoPreview)

}())
