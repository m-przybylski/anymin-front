function proTagsDropdown($timeout) {

  function linkFunction(scope, element, attr) {
    let myScrollbarChoices

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

    scope.onFocus = ()=> {
      scope.focus = true
      scope.onClick = true
    }

    scope.openBar = function() {
      _getScrollbarChoices().perfectScrollbar()
    }

    scope.select = function(item, model) {
      if ('employee' in attr) {
        scope.proModel.push({email: item})
      } else {
        scope.proModel.push(item)
      }
      _onFocusOut()
      _getScrollbarChoices().perfectScrollbar()
    }

    scope.remove = ($item, $model)=> {
      scope.proModel.splice(scope.proModel.indexOf($item), 1)
    }

    scope.onKeypress = (event)=> {
      if (event.keyCode === 38) {
        event.preventDefault()
      }
      if ('disableTyping' in attr && event) {
        event.preventDefault()
      }
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
    templateUrl: 'directives/interface/pro-tags-dropdown/pro-tags-dropdown.tpl.html',
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      proModel: '=',
      proItems: '=',
      placeholder: '@',
      defaultValue: '@',
      label: '@',
      tagLabel: '@'

    }
  }


}


angular.module('profitelo.directives.interface.pro-tags-dropdown', [
  'ui.bootstrap',
  'ui.select',
  'ngSanitize'])
  .directive('proTagsDropdown', proTagsDropdown)


