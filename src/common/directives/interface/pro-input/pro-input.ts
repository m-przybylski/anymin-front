import * as angular from 'angular'
import {IDirective} from 'angular'

(function(): void {
  function proInput(): IDirective {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: any): void {

      const digitsCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      scope.required = false
      scope.focus = false
      scope.onClick = false
      const placeholder = scope.placeholder
      const _inputGroup = $(element)
      const _excludedKeyCodesForPhone = digitsCodes.concat([13, 8])
      const _excludedKeyCodesForCurrency = digitsCodes.concat([8, 13, 46, 44])

      if (!scope.type) {
        scope.type = 'text'
      }

      if ('required' in attr.$attr) {
        scope.required = true
      }

      if ('autoFocus' in attr.$attr) {
        _inputGroup.find('input').focus()
      }

      if ('onlyDigits' in attr.$attr) {
        element.bind('keypress', function(e): void {
          const code = e.keyCode || e.which
          if (_excludedKeyCodesForPhone.indexOf(code) < 0) {
            e.preventDefault()
          }
        })
      }

      if ('noDigits' in attr.$attr) {
        element.bind('keypress', function(e): void {
          const code = e.keyCode || e.which
          if (_excludedKeyCodesForPhone.indexOf(code) > 0) {
            e.preventDefault()
          }
        })
      }

      if ('currency' in attr.$attr) {
        element.bind('keypress', function(e): void {
          const code = e.keyCode || e.which
          if (_excludedKeyCodesForCurrency.indexOf(code) < 0) {
            e.preventDefault()
          }
        })
      }

      const _setAddon = (value: boolean): void => {
        scope.addon = value
      }

      scope.addonCall = (): void => {
        if (typeof scope.addonAction === 'function') {
          scope.addonAction()
        }
      }

      scope.focusInput = (): void => {
        _inputGroup.find('input').focus()
      }

      $(element).on('click', scope.focusInput)

      scope.onFocus = (): void => {
        scope.focus = true
        scope.onClick = true
        scope.placeholder = ''
      }
      scope.onFocusOut = (): void => {
        scope.focus = false
        scope.onClick = false
        scope.placeholder = placeholder
      }
      if (scope.addonText || scope.iconClass) {
        _setAddon(true)
      } else {
        _setAddon(false)
      }
      scope.hideCross = (): boolean => {
        return ('noDelete' in attr)
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
      require: '?ngModel',
      template: require('./pro-input.pug'),
      restrict: 'E',
      replace: true,
      link: linkFunction,
      scope: {
        ngModel: '=',
        placeholder: '@',
        defaultValue: '@',
        label: '@',
        addonText: '@',
        iconClass: '@',
        type: '@',
        id: '@',
        maxlength: '@',
        ngPattern: '=?',
        addonAction: '=?',
        ngChange: '=?',
        focus: '=?'
      }

    }

  }

  angular.module('profitelo.directives.interface.pro-input', [])
  .directive('proInput', proInput)

}())
