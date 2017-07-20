import * as angular from 'angular'

  class AutoFocus implements ng.IDirective {
    public restrict: string = 'A'

    /* @ngInject */
    constructor() {
    }

    public link = (_scope: ng.IScope, element: ng.IRootElementService, attr: ng.IAttributes): void => {
      const input = element.find('input')[0]

      if ('autoFocus' in attr.$attr) {
        input.focus()
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
