import * as angular from 'angular'
import {CommonSettingsService} from '../../services/common-settings/common-settings.service'
import commonSettingsModule from '../../services/common-settings/common-settings'

  class NgEnter implements ng.IDirective {
    public restrict: string = 'A'

    /* @ngInject */
    constructor(private CommonSettingsService: CommonSettingsService) {
    }

    public link = (scope: ng.IScope, elem: ng.IRootElementService, attrs: ng.IAttributes): void => {
      const enterKeyCode: number = this.CommonSettingsService.keyboardKeyCodes.enter
      elem.bind('keydown keypress', function(event): void {
        if (event.which === enterKeyCode) {
          scope.$apply(function(): void {
            scope.$eval(attrs.ngEnter)
          })
          event.preventDefault()
        }
      })
    }

    public static getInstance = (): (CommonSettingsService: CommonSettingsService) => NgEnter => {
      const instance = (CommonSettingsService: CommonSettingsService): NgEnter =>
        new NgEnter(CommonSettingsService)
      instance.$inject = ['CommonSettingsService']
      return instance
    }
  }

const ngEnter =  angular.module('profitelo.directives.ng-enter', [
  commonSettingsModule
])
  .directive('ngEnter', NgEnter.getInstance())
  .name

  export default ngEnter
