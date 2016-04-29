function proInputPassword($timeout) {

  function linkFunction(scope, element, attr) {

    scope.required = false
    scope.focus = false
    scope.onClick = false
    scope.inputType = 'password'
    let placeholder = scope.placeholder
    let _input = $(element).find('input')

    if ('required' in attr.$attr) {
      scope.required = true
    }

    scope.focusInput = function() {
      _input.focus()
    }
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

    scope.onMouseover = ()=> {
      scope.focus = true
    }
    scope.onMouseout = ()=> {
      if (!scope.onClick) {
        scope.focus = false
      }
    }
  }

  return {
    templateUrl:  'directives/interface/pro-input-password/pro-input-password.tpl.html',
    restrict:     'E',
    replace:      true,
    link: linkFunction,
    scope: {
      proModel: '=',
      placeholder: '@',
      defaultValue: '@',
      label: '@',
      onChange: '=?',
      name: '@',
      ngPattern: '=?'
    }
  }
}

angular.module('profitelo.directives.interface.pro-input-password', [])
.directive('proInputPassword', proInputPassword)
