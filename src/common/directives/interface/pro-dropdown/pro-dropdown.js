function proDropdown($timeout) {

  function linkFunction(scope, element, attr) {
    let myScrollbarChoices

    function _getScrollbarChoices() {
      if (!myScrollbarChoices) {
        myScrollbarChoices = $('.ui-select-choices')
      }
      return myScrollbarChoices
    }

    //console.log(selected.name)

    scope.openBar = function() {
      _getScrollbarChoices().perfectScrollbar()
    }
    scope.select = function(item, model) {
      if (typeof item === 'object') {
        return item.value
      }
      scope.proModel = item.value
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


