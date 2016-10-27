(function() {
  function expertSlider(DialogService) {
    function linkFunction(scope) {

      scope.imageUrl = (slide) => {
        return slide.previews[0]
      }

      scope.controlls = {}

      scope.nextSlide = function() {
        scope.controlls.nextSlide()
      }

      scope.prevSlide = function() {
        scope.controlls.prevSlide()
      }
    }

    return {
      templateUrl: 'directives/expert-profile/expert-slider/expert-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        sliders: '=?'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.expert-profile.expert-slider', [
    'profitelo.components.interface.slider',
    'profitelo.common.controller.gallery-modal',
    'profitelo.services.helper-service'
  ])
    .directive('expertSlider', expertSlider)

}())
