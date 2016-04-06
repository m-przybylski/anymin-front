function proInput() {

  function linkFunction(scope, element, attr) {
    let _inputGroup = $(element)
    scope.focus = false
    scope.onOut = false
    scope.focusInput = function() {
      _inputGroup.find('input').focus()
    }
    scope.onFocus = function() {
      scope.focus = true
      scope.ngOut = false
    }
    scope.onFocusOut = function() {
      scope.focus = false
      scope.ngOut = true
    }

  }

  return {
    templateUrl:  'directives/interface/pro-input/pro-input.tpl.html',
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


angular.module('profitelo.directives.interface.pro-input', [])
.directive('proInput', proInput)
