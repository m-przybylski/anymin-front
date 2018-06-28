// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
(function(): void {

  const proLightboxNav = {
    transclude: true,
    template: require('./pro-lightbox-nav.html'),
    bindings: {
      navSettings: '=?'
    }
  };

  angular.module('profitelo.components.pro-lightbox-nav', [

  ])
    .component('proLightboxNav', proLightboxNav);

}());
