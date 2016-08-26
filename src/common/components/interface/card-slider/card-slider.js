(function() {

  /* @ngInject */
  function defaultCardSliderFunction($scope, $window, $timeout, $element) {
    
    return this
  }

  let cardSlider = {
    bindings: {
      cards: '<',
      controlls: '='
    },
    templateUrl:    'components/interface/card-slider/card-slider.tpl.html',
    controllerAs: 'vm',
    controller: defaultCardSliderFunction
  }


  angular.module('profitelo.components.interface.card-slider', [
    'pascalprecht.translate'
  ])
    .component('cardSlider', cardSlider)
}())
