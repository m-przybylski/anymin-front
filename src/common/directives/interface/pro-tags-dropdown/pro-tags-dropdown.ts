namespace profitelo.directives.interface.proTagsDropdown {
  function proTagsDropdown($timeout: ng.ITimeoutService) {

    function linkFunction(scope: any, element: ng.IRootElementService, attr: ng.IAttributes) {
      let myScrollbarChoices: JQuery

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

      scope.tagTransform = (item: any) => {
        item = item.trim()
        if (!angular.isDefined(scope.validPattern) || item.match(scope.validPattern)) {
          var newItem: any = {}
          newItem[scope.tagNameParam] = item
          scope.valid = false
          return newItem
        } else {
          scope.valid = true
          return null
        }
      }

      scope.select = (item: any, _model: any, _select: any) => {
        scope.valid = false
        scope.proModel.push(item)
        _onFocusOut()
        _getScrollbarChoices().perfectScrollbar()
      }

      scope.remove = ($item: any, _$model: any) => {
        scope.proModel.splice(scope.proModel.indexOf($item), 1)
      }

      scope.onKeypress = (event: any, select: any) => {
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

      scope.groupFind = (item: any) => item

      scope.update = () => {
        _getScrollbarChoices().perfectScrollbar('destroy')
        $timeout(() => {
          _getScrollbarChoices().perfectScrollbar()
        })
      }
      scope.searchEnable = () => {
        if ('noSearch' in attr) {
          return false
        }
        return true
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
}


