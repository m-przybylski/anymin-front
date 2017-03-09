import * as angular from "angular"
import "angular-ui-router"
const templateUrl = require("../../../templates/range-slider/range-slider.tpl.pug")

function proRangeSlider($timeout: ng.ITimeoutService) {

  function linkFunction(scope: any, _elem: ng.IRootElementService, _attrs: ng.IAttributes) {
    /* istanbul ignore next */
    scope.refreshSlider = () => {
      $timeout(() => {
        scope.$broadcast('rzSliderForceRender')
      })
    }

    scope.templateUrl = templateUrl

    scope.options = {
      floor: 0,
      ceil: 100,
      onEnd: (_sliderId: string, modelValue: string, highValue: string, pointerType: string) => {
        scope.callback(modelValue, highValue, pointerType)
      }
    }

  }

  return {
    template: require('./pro-range-slider.jade')(),
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
  'rzModule',
  'ui.router'
])
  .directive('proRangeSlider', proRangeSlider)
