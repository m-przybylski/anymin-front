function proInput() {

  function linkFunction(scope, element, attr) {
    let _inputGroup = $(element)
    let _setAddon = function(value) {
      scope.addon = value
      scope.activeAddon = value
    }
    scope.focus = false
    scope.onOut = false
    scope.focusInput = function () {
      _inputGroup.find('input').focus()
    }
    scope.onFocus = function () {
      scope.focus = true
      scope.ngOut = false
    }
    scope.onFocusOut = function () {
      scope.focus = false
      scope.ngOut = true
    }
    if (scope.addonText || scope.iconClass) {
      _setAddon(true)
    } else {
      _setAddon(false)
    }
    scope.hideCross = function () {
      return ('noDelete' in attr)
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
      label: '@',
      addonText: '@',
      iconClass: '@'
    }

  }

}

angular.module('profitelo.directives.interface.pro-input', [])
.directive('proInput', proInput)
