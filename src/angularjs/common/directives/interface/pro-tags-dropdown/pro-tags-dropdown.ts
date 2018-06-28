// tslint:disable:no-parameter-reassignment
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-method-signature
// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import * as angular from 'angular';
import 'angular-ui-bootstrap';
import 'ui-select';
import 'angular-sanitize';
import commonSettingsModule from '../../../services/common-settings/common-settings';
import { IDirective } from 'angular';
import { keyboardCodes } from '../../../classes/keyboard';

export interface IProTagsDropdownScope extends ng.IScope {
  valid: boolean;
  tagTransform: (item: string) => {[key: string]: string} | undefined;
  validPattern: string;
  proModel: string[];
  select: (item: string) => void;
  searchEnable: () => boolean;
  remove: (item: any) => void;
  update: () => void;
  onFocus: () => void;
  focus: boolean;
  onClick: boolean;
  onKeypress: (event: KeyboardEvent, select?: any) => void;
  openBar: () => void;
  disableTagging: boolean;
  tagNameParam: string;
  onSearch: (item: {}) => void;
  groupFind: (item: string) => string;
}

function proTagsDropdown($timeout: ng.ITimeoutService): IDirective<ng.IScope> {

  function linkFunction(scope: IProTagsDropdownScope, element: ng.IRootElementService, attr: ng.IAttributes): void {
    let myScrollbarChoices: JQuery;

    function _getScrollbarChoices(): JQuery {
      if (!myScrollbarChoices) {
        myScrollbarChoices = $(element).find('.ui-select-choices');
      }
      return myScrollbarChoices;
    }

    function _onFocusOut(): void {
      scope.focus = false;
      scope.onClick = false;
    }

    scope.onFocus = (): void => {
      scope.focus = true;
      scope.onClick = true;
    };

    scope.openBar = (): void => {
      _getScrollbarChoices().perfectScrollbar();
    };

    scope.disableTagging = !!('disableTagging' in attr);

    scope.tagTransform = (item: string): {[key: string]: string} | undefined => {
      item = item.trim();
      if (!angular.isDefined(scope.validPattern) || item.match(scope.validPattern)) {
        const newItem: {[key: string]: string} = {};
        newItem[scope.tagNameParam] = item;
        scope.valid = false;
        return newItem;
      } else {
        scope.valid = true;
        return undefined;
      }
    };

    scope.select = (item: string): void => {
      scope.valid = false;
      scope.proModel.push(item);
      _onFocusOut();
      _getScrollbarChoices().perfectScrollbar();
    };

    scope.remove = ($item: any): void => {
      scope.proModel.splice(scope.proModel.indexOf($item), 1);
    };

    scope.onKeypress = (event: KeyboardEvent, select: any): void => {
      if (event.keyCode === keyboardCodes.arrowUp) {
        event.preventDefault();
      }
      if ('disableTyping' in attr && event) {
        event.preventDefault();
      }
      if (angular.isFunction(scope.onSearch)) {
        $timeout(() => scope.onSearch({search: select.search}));
      }
    };

    scope.groupFind = (item: string): string => item;

    scope.update = (): void => {
      _getScrollbarChoices().perfectScrollbar('destroy');
      $timeout(() => {
        _getScrollbarChoices().perfectScrollbar();
      });
    };
    scope.searchEnable = (): boolean => !('noSearch' in attr);

  }

  return {
    template: require('./pro-tags-dropdown.html'),
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
  };

}

angular.module('profitelo.directives.interface.pro-tags-dropdown', [
  'ui.bootstrap',
  'ui.select',
  commonSettingsModule,
  'ngSanitize'])
  .directive('proTagsDropdown', ['$timeout', proTagsDropdown]);
