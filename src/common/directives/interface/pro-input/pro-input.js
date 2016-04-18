function proInput() {

  function linkFunction(scope, element, attr) {
    
    scope.required = false
    scope.focus = false
    scope.onClick = false
    let placeholder = scope.placeholder
    let _inputGroup = $(element)

    if (!scope.type) {
      scope.type = 'text'
    }

    if ('required' in attr.$attr) {
      scope.required = true
    }

    let _setAddon = function(value) {
      scope.addon = value
      scope.activeAddon = value
    }

    scope.focusInput = function() {
      _inputGroup.find('input').focus()
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
    if (scope.addonText || scope.iconClass) {
      _setAddon(true)
    } else {
      _setAddon(false)
    }
    scope.hideCross = function() {
      return ('noDelete' in attr)
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
