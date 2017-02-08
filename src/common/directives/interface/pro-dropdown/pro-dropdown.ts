function proDropdown($timeout, lodash: _.LoDashStatic) {

  function linkFunction(scope, element, attr) {
    let myScrollbarChoices
    let currentDropdownStatus = false

    function _getScrollbarChoices() {
      if (!myScrollbarChoices) {
        myScrollbarChoices = $('.ui-select-choices')
      }
      return myScrollbarChoices
    }

    function _onFocusOut() {
      scope.focus = false
      scope.onClick = false
    }

    scope.$watch(() => {
      return scope.selectedItem
    }, (newValue, oldValue) => {
      _onFocusOut()
      if (newValue !== undefined) {
        scope.proModel = newValue.value
      }
    }, true)

    scope.$watch(() => {
      return scope.proItems
    }, () => {
      if (scope.proModel) {
        scope.selectedItem = lodash.find(scope.proItems, (o: any) => angular.equals(o.value, scope.proModel))
      }
    }, true)

    scope.onFocus = ()=> {
      scope.focus = true
      scope.onClick = true
    }

    scope.openBar = function(select) {
      if (currentDropdownStatus) {
        select.close()
      }
      _getScrollbarChoices().perfectScrollbar()
    }
    scope.onOpenClose = (isOpen) => {
      currentDropdownStatus = isOpen
    }


    scope.select = function(item, model) {
      scope.selectedItem = item
      _onFocusOut()
      _getScrollbarChoices().perfectScrollbar()
      if (scope.callback && angular.isFunction(scope.callback)) {
        scope.callback(item, model)
      }
    }

    scope.isDisable = () => {
      if ('disable' in attr) {
        return true
      }
      return false
    }

    scope.update = function() {
      _getScrollbarChoices().perfectScrollbar('destroy')
      $timeout(()=> {
        _getScrollbarChoices().perfectScrollbar()
      })
    }
    scope.searchEnable = () => {
      if ('noSearch' in attr) {
        return false
      }
      return false
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
    templateUrl: 'directives/interface/pro-dropdown/pro-dropdown.tpl.html',
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      proModel: '=',
      proItems: '=',
      callback: '=?',
      selectedItem: '=?',
      placeholder: '@',
      defaultValue: '@',
      label: '@'
    }
  }
}

angular.module('profitelo.directives.interface.pro-dropdown', [
  'ui.bootstrap',
  'ui.select',
  'ngLodash',
  'ngSanitize'])
  .directive('proDropdown', proDropdown)


