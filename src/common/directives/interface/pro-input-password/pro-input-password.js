function proInputPassword() {

  function linkFunction(scope, element, attr) {


    scope.required = false
    scope.focus = false
    scope.onOut = false
    scope.inputType = 'password'

    let _input = $(element).find('input')

    if ('required' in attr.$attr) {
      scope.required = true
    }

    scope.focusInput = function() {
      _input.focus()
    }
    scope.onFocus = function() {
      scope.focus = true
      scope.onOut = false
    }
    scope.onFocusOut = function() {
      scope.focus = false
      scope.onOut = true
    }
    scope.passwordHandler = function() {
      if (scope.inputType === 'password') {
        scope.inputType = 'text'
      } else {
        scope.inputType = 'password'
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
      name: '@'
    }
  }
}

angular.module('profitelo.directives.interface.pro-input-password', [])
.directive('proInputPassword', proInputPassword)
