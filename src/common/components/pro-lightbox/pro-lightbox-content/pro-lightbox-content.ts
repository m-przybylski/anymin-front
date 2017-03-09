(function() {

  let proLightboxContent = {
    transclude: true,
    template: require('./pro-lightbox-content.jade')(),
    bindings: {
      slide: '<'
    }
  }

  angular.module('profitelo.components.pro-lightbox-content', [

  ])
    .component('proLightboxContent', proLightboxContent)

}())
