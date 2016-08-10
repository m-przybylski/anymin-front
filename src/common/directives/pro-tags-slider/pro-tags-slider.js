(function() {
  function proTagsSlider($window, $timeout) {
    function linkFunction(scope, element) {
      scope.controlls = {}

      scope.nextSlide = function() {
        scope.controlls.nextSlide()
      }

      scope.prevSlide = function() {
        scope.controlls.prevSlide()
      }
    }


    return {
      templateUrl: 'directives/pro-tags-slider/pro-tags-slider.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {
        tags: '=?',
        onTagClickAction: '=?'
      },
      link: linkFunction
    }
  }

  angular.module('profitelo.directives.pro-tags-slider', [
    'profitelo.components.interface.slider'
  ])
    .directive('proTagsSlider', proTagsSlider)

}())
