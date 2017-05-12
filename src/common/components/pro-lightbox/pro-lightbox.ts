import * as angular from 'angular'
import 'common/components/pro-lightbox/pro-lightbox-content/pro-lightbox-content'
import 'common/components/pro-lightbox/pro-lightbox-nav/pro-lightbox-nav'

(function() {

  const proLightbox = {
    transclude: true,
    template: require('./pro-lightbox.pug')(),
    bindings: {
      currentSlide: '<',
      actionsSettings: '=?',
      slidesList: '<',
      sliderActions: '=?'
    }
  }

  angular.module('profitelo.components.pro-lightbox', [
    'profitelo.components.pro-lightbox-nav',
    'profitelo.components.pro-lightbox-content',
    'ui.bootstrap'
  ])
    .component('proLightbox', proLightbox)

}())
