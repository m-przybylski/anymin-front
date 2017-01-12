/* istanbul ignore next */
(function () {
  /* @ngInject */
  function defaultCardSliderFunction($timeout: ng.ITimeoutService) {

    this.$onInit = () => {
    }

    let container = angular.element('.card-slider-to-slide')

    $timeout(() => {
      container.find('>div').last().prependTo(container)
    })

    this.nextSlide = () => {
      container.find('>div').first().appendTo(container)
      container.css('left', '0px')
      container.animate({left: '-304px'}, 333)
    }

    this.prevSlide = () => {
      container.find('>div').last().prependTo(container)
      container.css('left', '-=304px')
      container.animate({left: '-304px'}, 200)
    }

    return this
  }

  let cardSlider = {
    bindings: {
      cards: '<',
      controlls: '='
    },
    templateUrl: 'components/interface/card-slider/card-slider.tpl.html',
    controllerAs: 'vm',
    controller: defaultCardSliderFunction
  }

  angular.module('profitelo.components.interface.card-slider', [
    'pascalprecht.translate'
  ])
  .component('cardSlider', cardSlider)
}())
