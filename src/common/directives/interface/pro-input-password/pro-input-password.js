function proInputPassword() {

  function linkFunction(scope, element, attr) {
    let _inputGroup = $(element)
    let _input = _inputGroup.find('input')
    scope.focus = false
    scope.onOut = false
    scope.showPassword = false
    scope.focusInput = function() {
      _input.focus()
    }
    scope.onFocus = function() {
      scope.focus = true
      scope.ngOut = false
    }
    scope.onFocusOut = function() {
      scope.focus = false
      scope.ngOut = true
    }
    scope.passwordHandler = function() {
      if (_input.attr('type') === 'password') {
        _input.attr('type', 'text')
        scope.showPassword = true
      }else {
        _input.attr('type', 'password')
        scope.showPassword = false
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
      label: '@'
    }

  }

}


angular.module('profitelo.directives.interface.pro-input-password', [])
.directive('proInputPassword', proInputPassword)
