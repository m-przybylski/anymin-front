(function() {

  let proLightboxContent = {
    transclude: true,
    templateUrl: 'components/pro-lightbox/pro-lightbox-content/pro-lightbox-content.tpl.html',
    bindings: {
      slide: '<'
    }
  }

  angular.module('profitelo.components.pro-lightbox-content', [

  ])
    .component('proLightboxContent', proLightboxContent)

}())