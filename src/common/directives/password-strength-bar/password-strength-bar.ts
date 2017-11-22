/* tslint:disable:  no-magic-numbers */

import * as angular from 'angular'
import {IDirective} from 'angular'

export interface IPasswordStrengthScope extends ng.IScope {
  currentClass: number,
  classes: string[]
}

(function(): void {
  function passwordStrengthBar(): IDirective<ng.IScope, ng.IScope> {

    function linkFunction(scope: IPasswordStrengthScope,
                          _element: ng.IRootElementService,
                          _attr: ng.IAttributes): void {
      scope.classes = [
        'start',
        'very-weak',
        'weak',
        'strong',
        'very-strong'
      ]
      scope.currentClass = 0

      scope.$watch(() => scope.currentClass, (newValue: number, _oldValue: number) => {
        scope.currentClass = Math.floor(scope.currentClass)

        if (newValue > 4) {
          scope.currentClass = 4
        }
        if (newValue < 0) {
          scope.currentClass = 0
        }
      })

    }
    return {
      template: require('./password-strength-bar.pug')(),
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        currentClass: '=?'
      }
    }
  }

  angular.module('profitelo.directives.password-strength-bar', [])
  .directive('passwordStrengthBar', passwordStrengthBar)

}())
