function proTagsDropdown($timeout, CommonSettingsService) {

  function linkFunction(scope, element, attr) {
    let myScrollbarChoices

    function _getScrollbarChoices() {
      if (!myScrollbarChoices) {
        myScrollbarChoices = $(element).find('.ui-select-choices')
      }
      return myScrollbarChoices
    }

    function _onFocusOut() {
      scope.focus = false
      scope.onClick = false
    }

    scope.onFocus = () => {
      scope.focus = true
      scope.onClick = true
    }

    scope.openBar = () => {
      _getScrollbarChoices().perfectScrollbar()
    }

    scope.disableTagging = !!('disableTagging' in attr)

    scope.tagTransform = (item) => {
      item = item.trim()
      if (!angular.isDefined(scope.validPattern) || item.match(scope.validPattern)) {
        var newItem = {}
        newItem[scope.tagNameParam] = item
        scope.valid = false
        return newItem
      } else {
        scope.valid = true
        return null
      }
    }

    scope.select = (item, model, select) => {
      scope.valid = false
      scope.proModel.push(item)
      _onFocusOut()
      _getScrollbarChoices().perfectScrollbar()
    }

    scope.remove = ($item, $model)=> {
      scope.proModel.splice(scope.proModel.indexOf($item), 1)
    }

    scope.onKeypress = (event, select) => {
      if (event.keyCode === 38) {
        event.preventDefault()
      }
      if ('disableTyping' in attr && event) {
        event.preventDefault()
      }
      if (angular.isFunction(scope.onSearch)) {
        $timeout(() => scope.onSearch({search: select.search}))
      }
    }

    scope.groupFind = (item) => item

    scope.update = () => {
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
    templateUrl: 'directives/interface/pro-tags-dropdown/pro-tags-dropdown.tpl.html',
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {
      proModel: '=',
      proItems: '=',
      validPattern: '=?',
      tagNameParam: '=?',
      placeholder: '@',
      defaultValue: '@',
      label: '@',
      tagLabel: '@',
      onSearch: '&'
    }
  }


}


angular.module('profitelo.directives.interface.pro-tags-dropdown', [
  'ui.bootstrap',
  'ui.select',
  'profitelo.services.commonSettings',
  'ngSanitize'])
  .directive('proTagsDropdown', proTagsDropdown)


