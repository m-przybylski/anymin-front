(function() {
  function proInput() {

    function linkFunction(scope, element, attr) {

      const digitsCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      scope.required = false
      scope.focus = false
      scope.onClick = false
      let placeholder = scope.placeholder
      let _inputGroup = $(element)
      let _excludedKeyCodesForPhone = digitsCodes.concat([13, 8])
      let _excludedKeyCodesForCurrency = digitsCodes.concat([8, 13, 46, 44])
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
          if (_excludedKeyCodesForPhone.indexOf(code) < 0) {
            e.preventDefault()
          }
        })
      }

      if ('currency' in attr.$attr) {
        element.bind('keypress', function(e) {
          let code = e.keyCode || e.which
          if (_excludedKeyCodesForCurrency.indexOf(code) < 0) {
            e.preventDefault()
          }
        })
      }

      let _setAddon = (value) => {
        scope.addon = value
      }

      scope.addonCall = () => {
        if (typeof scope.addonAction === 'function') {
          scope.addonAction()
        }
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
      require: '?ngModel',
      templateUrl: 'directives/interface/pro-input/pro-input.tpl.html',
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
