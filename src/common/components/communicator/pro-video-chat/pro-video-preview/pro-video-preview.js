(function() {

  /* @ngInject */
  function controller($element, communicatorService) {

    communicatorService.bindLocalStreamElement($($element).find('video'))
    
  }

  let proVideoPreview = {
    templateUrl: 'components/communicator/pro-video-chat/pro-video-preview/pro-video-preview.tpl.html',
    controller: controller,
    controllerAs: 'vm'
  }

  angular.module('profitelo.components.communicator.pro-video-chat.pro-video-preview', [
    'pascalprecht.translate',
    'profitelo.services.communicatorService'

  ])
    .component('proVideoPreview', proVideoPreview)

}())
