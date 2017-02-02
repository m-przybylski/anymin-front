(function() {
  function proRangeSlider($timeout) {

    function linkFunction(scope, elem, attrs) {
      /* istanbul ignore next */
      scope.refreshSlider = () => {
        $timeout(() => {
          scope.$broadcast('rzSliderForceRender')
        })
      }

      scope.options = {
        floor: 0,
        ceil: 100,
        onEnd: (sliderId, modelValue, highValue, pointerType) => {
          scope.callback(modelValue, highValue, pointerType)
        }
      }

    }

    return {
      templateUrl: 'directives/interface/pro-range-slider/pro-range-slider.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        minValue: '=',
        maxValue: '=',
        callback: '=',
        label: '@'
      }
    }

  }

  angular.module('profitelo.directives.interface.pro-range-slider', [
    'rzModule'
  ])
    .directive('proRangeSlider', proRangeSlider)

}())