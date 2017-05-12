(function() {
  function proInputPassword() {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: any) {

      scope.required = false
      scope.focus = false
      scope.onClick = false
      scope.inputType = 'password'
      const placeholder = scope.placeholder
      const _input = $(element).find('input')

      if ('required' in attr.$attr) {
        scope.required = true
      }

      scope.focusInput = function() {
        _input.focus()
      }

      $(element).on('click', scope.focusInput)

      scope.onFocus = function() {
        scope.focus = true
        scope.onClick = true
        scope.placeholder = ''
      }
      scope.onFocusOut = function() {
        scope.focus = false
        scope.onClick = false
        scope.placeholder = placeholder
      }
      scope.passwordHandler = function() {
        if (scope.inputType === 'password') {
          scope.inputType = 'text'
        } else {
          scope.inputType = 'password'
        }
      }

      if ('autoFocus' in attr.$attr) {
        _input.focus()
      }

      scope.onMouseover = () => {
        scope.focus = true
      }
      scope.onMouseout = () => {
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
