function proInput() {

  function linkFunction(scope, element, attr) {
    
    scope.required = false

    if (!scope.type) {
      scope.type = 'text'
    }

    if ('required' in attr.$attr) {
      scope.required = true
    }

    let _inputGroup = $(element)
    let _setAddon = function(value) {
      scope.addon = value
      scope.activeAddon = value
    }
    scope.focus = false
    scope.onOut = false

    scope.focusInput = function() {
      _inputGroup.find('input').focus()
    }
    scope.onFocus = function() {
      scope.focus = true
      scope.onOut = false
    }
    scope.onFocusOut = function() {
      scope.focus = false
      scope.onOut = true
    }
    if (scope.addonText || scope.iconClass) {
      _setAddon(true)
    } else {
      _setAddon(false)
    }
    scope.hideCross = function() {
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
      iconClass: '@',
      name: '@',
      type: '@',
      maxlength: '@'
    }

  }

}

angular.module('profitelo.directives.interface.pro-input', [])
.directive('proInput', proInput)
