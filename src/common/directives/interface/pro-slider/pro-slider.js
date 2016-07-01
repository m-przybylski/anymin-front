(function() {
  function proSlider() {

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
      templateUrl: 'directives/interface/pro-slider/pro-slider.tpl.html',
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        minValue: '@',
        maxValue: '@'
      }
    }

  }

  angular.module('profitelo.directives.interface.pro-slider', [
    'rzModule'
  ])
    .directive('proSlider', proSlider)

}())