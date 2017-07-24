import * as angular from 'angular'
import 'angular-ui-bootstrap'
import 'ui-select'
import 'angular-sanitize'
import commonSettingsModule from '../../../services/common-settings/common-settings'
import {IDirective} from 'angular'

/* @ngInject */
function proTagsDropdown($timeout: ng.ITimeoutService): IDirective {

  function linkFunction(scope: any, element: ng.IRootElementService, attr: ng.IAttributes): void {
    let myScrollbarChoices: JQuery

    function _getScrollbarChoices(): JQuery {
      if (!myScrollbarChoices) {
        myScrollbarChoices = $(element).find('.ui-select-choices')
      }
      return myScrollbarChoices
    }

    function _onFocusOut(): void {
      scope.focus = false
      scope.onClick = false
    }

    scope.onFocus = (): void => {
      scope.focus = true
      scope.onClick = true
    }

    scope.openBar = (): void => {
      _getScrollbarChoices().perfectScrollbar()
    }

    scope.disableTagging = !!('disableTagging' in attr)

    scope.tagTransform = (item: any): void | null => {
      item = item.trim()
      if (!angular.isDefined(scope.validPattern) || item.match(scope.validPattern)) {
        const newItem: any = {}
        newItem[scope.tagNameParam] = item
        scope.valid = false
        return newItem
      } else {
        scope.valid = true
        return null
      }
    }

    scope.select = (item: any, _model: any, _select: any): void => {
      scope.valid = false
      scope.proModel.push(item)
      _onFocusOut()
      _getScrollbarChoices().perfectScrollbar()
    }

    scope.remove = ($item: any, _$model: any): void => {
      scope.proModel.splice(scope.proModel.indexOf($item), 1)
    }

    scope.onKeypress = (event: any, select: any): void => {
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

    scope.groupFind = (item: any): void => item

    scope.update = (): void => {
      _getScrollbarChoices().perfectScrollbar('destroy')
      $timeout(() => {
        _getScrollbarChoices().perfectScrollbar()
      })
    }
    scope.searchEnable = (): boolean => {
      return !('noSearch' in attr)
    }

  }

  return {
    template: require('./pro-tags-dropdown.pug')(),
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
  commonSettingsModule,
  'ngSanitize'])
  .directive('proTagsDropdown', proTagsDropdown)
