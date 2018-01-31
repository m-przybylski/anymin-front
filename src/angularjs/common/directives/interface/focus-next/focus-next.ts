import * as angular from 'angular';
import { keyboardCodes } from '../../../classes/keyboard';

interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
}

class LocalAvatarUploaderDirective implements ng.IDirective<ng.IScope> {
  public static $inject = [];
  public restrict: string = 'A';

  constructor() {
  }

  public static getInstance = (): () => LocalAvatarUploaderDirective => {
    const instance = (): LocalAvatarUploaderDirective =>
      new LocalAvatarUploaderDirective();
    instance.$inject = [];
    return instance;
  }

  public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes): void => {
    const digitsCodes: number[] = [keyboardCodes.zero,
      keyboardCodes.one,
      keyboardCodes.two,
      keyboardCodes.three,
      keyboardCodes.four,
      keyboardCodes.five,
      keyboardCodes.six,
      keyboardCodes.seven,
      keyboardCodes.eight,
      keyboardCodes.nine];
    const validCodes: number[] = [keyboardCodes.backspace,
      keyboardCodes.arrowRight,
      keyboardCodes.arrowLeft];

    element.bind('keydown', (e: KeyboardEvent) => {
      if (digitsCodes.indexOf(e.which) < 0 && validCodes.indexOf(e.which) < 0) {
        e.preventDefault();
      }
    });

    element.bind('keyup', (e: KeyboardEvent) => {
      const goToNextElement = (): void => {
        if (!!element.next()[0]) {
          element.next()[0].focus();
        }
      };

      const goToPrevElement = (): void => {
        if (!!element.prev()[0]) {
          element.prev()[0].focus();
        }
      };

      if (digitsCodes.indexOf(e.which) > -1) {
        element[0].value = String(e.key);
        goToNextElement();
      } else {
        switch (e.which) {
          case keyboardCodes.escape:
            goToPrevElement();
            break;
          case keyboardCodes.arrowRight:
            goToNextElement();
            break;
          case keyboardCodes.arrowLeft:
            goToPrevElement();
            break;
          default:
            break;
        }
      }
    });

    scope.$on('$destroy', () => {
      element.unbind('keyup');
      element.unbind('keydown');
    });

  }

}

const focusNext =  angular.module('profitelo.directives.interface.focus-next', [])
  .directive('focusNext', LocalAvatarUploaderDirective.getInstance())
  .name;

export default focusNext;
