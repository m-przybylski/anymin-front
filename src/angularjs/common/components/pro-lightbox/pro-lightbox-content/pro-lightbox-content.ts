// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
(function(): void {

  const proLightboxContent = {
    transclude: true,
    template: require('./pro-lightbox-content.html'),
    bindings: {
      slide: '<'
    }
  };

  angular.module('profitelo.components.pro-lightbox-content', [

  ])
    .component('proLightboxContent', proLightboxContent);

}());
