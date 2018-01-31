import * as angular from 'angular';
import { IDirective } from 'angular';

export interface IProSwitcherScope extends ng.IScope {
  ngModel: boolean;
  isChecked: boolean;
}

(function(): void {
  function proSwitcher(): IDirective<ng.IScope> {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: ng.IAttributes): void {

      if (typeof scope.ngModel !== 'boolean') {
        throw new Error('ngModel must be of boolean type');
      }

      const changeCheckedState = (state: string): void => {
        element.find('input').prop('checked', state);
      };

      scope.onClickCallback = (): void => {
        scope.ngModel = !scope.ngModel;
        changeCheckedState(scope.ngModel);
        if (angular.isFunction(scope.callback)) {
          scope.callback(scope.ngModel);
        }
      };
      changeCheckedState(scope.ngModel);
      if ('id' in attr.$attr) {
        scope.id = (<any>attr).id;
      }
    }

    return {
      template: require('./pro-switcher.html'),
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        ngModel: '=',
        callback: '=?',
        label: '@',
        name: '@'
      }
    };

  }

  angular.module('profitelo.directives.interface.pro-switcher', [])
    .directive('proSwitcher', [proSwitcher]);

}());
