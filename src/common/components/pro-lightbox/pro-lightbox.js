(function() {
  
  let proLightbox = {
    transclude: true,
    templateUrl: 'components/pro-lightbox/pro-lightbox.tpl.html',
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