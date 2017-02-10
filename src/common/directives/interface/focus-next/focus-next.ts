namespace profitelo.directives.interface.focusNext {

  interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
  }

  class LocalAvatarUploaderDirective implements ng.IDirective {
    public restrict: string = 'A'

    /* ngInject */
    constructor() {
    }

    public link = (_scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes) => {
      const forbiddenKeys: Array<number> = [13, 8, 9, 32, 37, 38, 39, 40]
      element.bind('keyup', (e: any) => {
        if (forbiddenKeys.indexOf(e.which) === -1) {
          element.next()[0].focus()
        }
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
