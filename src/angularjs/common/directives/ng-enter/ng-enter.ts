// tslint:disable:newline-before-return
import * as angular from 'angular';
import commonSettingsModule from '../../services/common-settings/common-settings';
import { keyboardCodes } from '../../classes/keyboard';

// tslint:disable:member-ordering
class NgEnter implements ng.IDirective<ng.IScope> {
  public restrict = 'A';

  public static $inject = [];

  constructor() {
  }

  public link = (scope: ng.IScope, elem: ng.IRootElementService, attrs: ng.IAttributes): void => {
    const enterKeyCode = keyboardCodes.enter;
    elem.bind('keydown keypress', function (event): void {
      if (event.which === enterKeyCode) {
        if (elem[0].tagName === 'INPUT') {
          elem[0].blur();
          elem[0].focus();
        }

        scope.$apply(function (): void {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  }

  public static getInstance = (): () => NgEnter => {
    const instance = (): NgEnter =>
      new NgEnter();
    instance.$inject = [];
    return instance;
  }
}

const ngEnter = angular.module('profitelo.directives.ng-enter', [
  commonSettingsModule
])
  .directive('ngEnter', NgEnter.getInstance())
  .name;

export default ngEnter;
