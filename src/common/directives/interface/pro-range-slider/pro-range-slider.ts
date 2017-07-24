import * as angular from 'angular'
import 'angular-ui-router'
import {IDirective} from 'angular'

function proRangeSlider($timeout: ng.ITimeoutService): IDirective {

  function linkFunction(scope: any, _elem: ng.IRootElementService, _attrs: ng.IAttributes): void {
    /* istanbul ignore next */
    scope.refreshSlider = (): void => {
      $timeout(() => {
        scope.$broadcast('rzSliderForceRender')
      })
    }

    scope.options = {
      floor: 0,
      ceil: 20,
      onEnd: (_sliderId: string, modelValue: string, highValue: string, pointerType: string): void => {
        scope.callback(modelValue, highValue, pointerType)
      }
    }

  }

  return {
    template: require('./pro-range-slider.pug')(),
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
