import * as angular from 'angular'

  class NgEnter implements ng.IDirective {
    public restrict: string = 'A'

    /* @ngInject */
    constructor() {
    }

    public link = (scope: ng.IScope, elem: ng.IRootElementService, attrs: ng.IAttributes): void => {
      elem.bind('keydown keypress', function(event): void {
        if (event.which === 13) {
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

const ngEnter =  angular.module('profitelo.directives.ng-enter', [])
  .directive('ngEnter', NgEnter.getInstance())
  .name

  export default ngEnter
