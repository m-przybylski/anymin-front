// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
import * as angular from 'angular';
import 'angularjs/common/components/pro-lightbox/pro-lightbox-content/pro-lightbox-content';
import 'angularjs/common/components/pro-lightbox/pro-lightbox-nav/pro-lightbox-nav';

(function(): void {

  const proLightbox = {
    transclude: true,
    template: require('./pro-lightbox.html'),
    bindings: {
      currentSlide: '<',
      actionsSettings: '=?',
      slidesList: '<',
      sliderActions: '=?'
    }
  };

  angular.module('profitelo.components.pro-lightbox', [
    'profitelo.components.pro-lightbox-nav',
    'profitelo.components.pro-lightbox-content',
    'ui.bootstrap'
  ])
    .component('proLightbox', proLightbox);

}());
