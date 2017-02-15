namespace profitelo.directives.interface.focusNext {

  interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
  }

  class LocalAvatarUploaderDirective implements ng.IDirective {
    public restrict: string = 'A'

    /* ngInject */
    constructor() {
    }

    public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes) => {
      const digitsCodes: Array<number>  = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      element.bind('keypress', (e: any) => {
        if (digitsCodes.indexOf(e.which) > -1) {
          element[0].value = String(e.key)
          if (!!element.next()[0]) {
            element.next()[0].focus()
          }
        } else {
          element[0].value = ''
        }
      })

      scope.$on('$destroy', () => {
        element.unbind('keypress')
      })

    }

    public static getInstance = () => {
      const instance = () =>
        new LocalAvatarUploaderDirective()
      instance.$inject = []
      return instance
    }

  }

  angular.module('profitelo.directives.interface.focus-next', [])
  .directive('focusNext', LocalAvatarUploaderDirective.getInstance())
}
