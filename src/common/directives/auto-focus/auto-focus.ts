import * as angular from 'angular'

  class AutoFocus implements ng.IDirective<ng.IScope, ng.IScope> {
    public restrict: string = 'A'

    /* @ngInject */
    constructor() {
    }

    public link = (_scope: ng.IScope, element: ng.IRootElementService, attr: ng.IAttributes,
                   $log: ng.ILogService): void => {

      const input = element.find('input')

      if (input !== undefined) {
        if ('autoFocus' in attr.$attr) {
          input[0].focus()
        }
      } else {
        $log.error('Input is undefined')
      }
    }

    public static getInstance = (): () => AutoFocus => {
      const instance = (): AutoFocus =>
        new AutoFocus()
      instance.$inject = []
      return instance
    }
  }

const autoFocus =  angular.module('profitelo.directives.auto-focus', [])
  .directive('autoFocus', AutoFocus.getInstance())
  .name

  export default autoFocus
