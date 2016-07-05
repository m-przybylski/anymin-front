(function() {
  function proRangeSlider() {

    function linkFunction($timeout, scope, elem, attrs) {

      scope.refreshSlider = ()=> {
        $timeout(()=> {
          scope.$broadcast('rzSliderForceRender')
        })
      }

      scope.options =   {
        floor: 0,
        ceil: 100
      }
    }

    return {
      templateUrl: 'directives/interface/pro-range-slider/pro-range-slider.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        minValue: '@',
        maxValue: '@'
      }
    }

  }

  angular.module('profitelo.directives.interface.pro-range-slider', [
    'rzModule'
  ])
    .directive('proRangeSlider', proRangeSlider)

}())