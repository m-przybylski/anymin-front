(function() {

  /* @ngInject */
  function defaultCardSliderFunction() {

    return this
  }

  let cardSlider = {
    transclude: true,
    bindings: {
      items: '<',
      moveSlides: '<',
      controlls: '='
    },
    controllerAs: 'vm',
    controller: defaultCardSliderFunction
  }


  angular.module('profitelo.components.interface.card-slider', [
    'pascalprecht.translate'
  ])
    .component('cardSlider', cardSlider)

}())
