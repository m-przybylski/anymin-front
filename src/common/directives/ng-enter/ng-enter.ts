import * as angular from 'angular'
import commonSettingsModule from '../../services/common-settings/common-settings'
import {KeyboardKeyCodes} from '../../classes/keyboard-key-codes'

  class NgEnter implements ng.IDirective {
    public restrict: string = 'A'

    /* @ngInject */
    constructor() {
    }

    public link = (scope: ng.IScope, elem: ng.IRootElementService, attrs: ng.IAttributes): void => {
      const enterKeyCode: number = KeyboardKeyCodes.keyCodes.enter
      elem.bind('keydown keypress', function(event): void {
        if (event.which === enterKeyCode) {
          scope.$apply(function(): void {
            scope.$eval(attrs.ngEnter)
          })
          event.preventDefault()
        }
      })
    }

    public static getInstance = (): () => NgEnter => {
      const instance = (): NgEnter =>
        new NgEnter()
      instance.$inject = []
      return instance
    }
  }

const ngEnter =  angular.module('profitelo.directives.ng-enter', [
  commonSettingsModule
])
  .directive('ngEnter', NgEnter.getInstance())
  .name

  export default ngEnter
