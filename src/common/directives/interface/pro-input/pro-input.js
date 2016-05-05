function proInput() {

  function linkFunction(scope, element, attr) {

    scope.required = false
    scope.focus = false
    scope.onClick = false
    let placeholder = scope.placeholder
    let _inputGroup = $(element)
    let _digitsArray = [13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]

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
      element.bind('keypress', function(e) {
        let code = e.keyCode || e.which
        if (_digitsArray.indexOf(code) < 0) {
          e.preventDefault()
        }
      })
    }

    let _setAddon = (value) => {
      scope.addon = value
      scope.activeAddon = value
    }

    scope.focusInput = () => {
      _inputGroup.find('input').focus()
    }

    $(element).on('click', scope.focusInput)

    scope.onFocus = () => {
      scope.focus = true
      scope.onClick = true
      scope.placeholder = ''
    }
    scope.onFocusOut = () => {
      scope.focus = false
      scope.onClick = false
      scope.placeholder = placeholder
    }
    if (scope.addonText || scope.iconClass) {
      _setAddon(true)
    } else {
      _setAddon(false)
    }
    scope.hideCross = () => {
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
    templateUrl: 'directives/interface/pro-input/pro-input.tpl.html',
    restrict: 'E',
    replace: true,
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
      maxlength: '@',
      ngPattern: '=?'
    }

  }

}

angular.module('profitelo.directives.interface.pro-input', [])
.directive('proInput', proInput)
