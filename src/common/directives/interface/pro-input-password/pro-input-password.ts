import * as angular from 'angular'
import {IDirective} from 'angular'

(function(): void {
  function proInputPassword(): IDirective {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: any): void {

      scope.required = false
      scope.focus = false
      scope.onClick = false
      scope.inputType = 'password'
      const placeholder = scope.placeholder
      const _input = $(element).find('input')

      if ('required' in attr.$attr) {
        scope.required = true
      }

      scope.focusInput = function(): void {
        _input.focus()
      }

      $(element).on('click', scope.focusInput)

      scope.onFocus = function(): void {
        scope.focus = true
        scope.onClick = true
        scope.placeholder = ''
      }
      scope.onFocusOut = function(): void {
        scope.focus = false
        scope.onClick = false
        scope.placeholder = placeholder
      }
      scope.passwordHandler = function(): void {
        if (scope.inputType === 'password') {
          scope.inputType = 'text'
        } else {
          scope.inputType = 'password'
        }
      }

      if ('autoFocus' in attr.$attr) {
        _input.focus()
      }

      scope.onMouseover = (): void => {
        scope.focus = true
      }
      scope.onMouseout = (): void => {
        if (!scope.onClick) {
          scope.focus = false
        }
      }
    }

    return {
      template: require('./pro-input-password.pug')(),
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        ngModel: '=',
        placeholder: '@',
        defaultValue: '@',
        label: '@',
        onChange: '=?',
        id: '@',
        ngPattern: '=?'
      }
    }
  }

  angular.module('profitelo.directives.interface.pro-input-password', [])
  .directive('proInputPassword', proInputPassword)

}())
