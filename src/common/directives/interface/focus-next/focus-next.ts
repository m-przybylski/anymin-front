namespace profitelo.directives.interface.focusNext {

  interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
  }

  class LocalAvatarUploaderDirective implements ng.IDirective {
    public restrict: string = 'A'

    /* @ngInject */
    constructor() {
    }

    public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes): void => {
      const digitsCodes: Array<number> = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
      const validCodes: Array<number> = [8, 39, 37]
      element.bind('keydown', (e: KeyboardEvent) => {
        if (digitsCodes.indexOf(e.which) < 0 && validCodes.indexOf(e.which) < 0) {
          e.preventDefault()
        }
      })

      element.bind('keyup', (e: KeyboardEvent) => {
        const goToNextElement = (): void => {
          if (!!element.next()[0]) {
            element.next()[0].focus()
          }
        }

        const goToPrevElement = (): void => {
          if (!!element.prev()[0]) {
            element.prev()[0].focus()
          }
        }

        if (digitsCodes.indexOf(e.which) > -1) {
          element[0].value = String(e.key)
          goToNextElement()
        } else {
          switch (e.which) {
            case 8:
              goToPrevElement()
              break
            case 39:
              goToNextElement()
              break
            case 37:
              goToPrevElement()
              break
            default:
              break
          }
        }
      })

      scope.$on('$destroy', () => {
        element.unbind('keyup')
        element.unbind('keydown')
      })

    }

    public static getInstance = (): () => LocalAvatarUploaderDirective => {
      const instance = (): LocalAvatarUploaderDirective =>
        new LocalAvatarUploaderDirective()
      instance.$inject = []
      return instance
    }
  }

  angular.module('profitelo.directives.interface.focus-next', [])
  .directive('focusNext', LocalAvatarUploaderDirective.getInstance())
}
