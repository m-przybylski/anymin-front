function proDropdown($timeout) {

  function linkFunction(scope, element, attr) {
    let myScrollbarChoices

    function _getScrollbarChoices() {
      if (!myScrollbarChoices) {
        myScrollbarChoices = $('.ui-select-choices')
      }
      return myScrollbarChoices
    }

    scope.$watch(() => {
      return scope.selectedItem
    }, (newValue, oldValue) => {
      if (newValue !== undefined) {
        scope.proModel = newValue.value
      }
    }, true)

    if (scope.proModel !== null && scope.proModel !== undefined) {
      scope.selectedItem= _.find(scope.proItems, function(o) { return angular.equals(o.value, scope.proModel) })
    }

    scope.onFocus = ()=> {
      scope.focus = true
      scope.onClick = true
    }
    scope.openBar = function() {
      _getScrollbarChoices().perfectScrollbar()
    }
    
    scope.select = function(item, model) {
      scope.selectedItem = item
      _getScrollbarChoices().perfectScrollbar()

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
      placeholder: '@',
      defaultValue: '@',
      label: '@'
    }
  }


}



angular.module('profitelo.directives.interface.pro-dropdown', [
  'ui.bootstrap',
  'ui.select',
  'ngSanitize'])
  .directive('proDropdown', proDropdown)


