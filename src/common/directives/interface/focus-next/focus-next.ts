import * as angular from 'angular'
import {KeyboardKeyCodes} from '../../../classes/keyboard-key-codes'

interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
}

class LocalAvatarUploaderDirective implements ng.IDirective {
  public restrict: string = 'A'

  /* @ngInject */
  constructor() {
  }

  public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes): void => {
    const digitsCodes: number[] = [KeyboardKeyCodes.keyCodes.zero,
      KeyboardKeyCodes.keyCodes.one,
      KeyboardKeyCodes.keyCodes.two,
      KeyboardKeyCodes.keyCodes.three,
      KeyboardKeyCodes.keyCodes.four,
      KeyboardKeyCodes.keyCodes.five,
      KeyboardKeyCodes.keyCodes.six,
      KeyboardKeyCodes.keyCodes.seven,
      KeyboardKeyCodes.keyCodes.eight,
      KeyboardKeyCodes.keyCodes.nine]
    const validCodes: number[] = [KeyboardKeyCodes.keyCodes.backspace,
      KeyboardKeyCodes.keyCodes.arrowRight,
      KeyboardKeyCodes.keyCodes.arrowLeft]

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
          case KeyboardKeyCodes.keyCodes.escape:
            goToPrevElement()
            break
          case KeyboardKeyCodes.keyCodes.arrowRight:
            goToNextElement()
            break
          case KeyboardKeyCodes.keyCodes.arrowLeft:
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

const focusNext =  angular.module('profitelo.directives.interface.focus-next', [])
  .directive('focusNext', LocalAvatarUploaderDirective.getInstance())
  .name

export default focusNext
