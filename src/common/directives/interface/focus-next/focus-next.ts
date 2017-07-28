import * as angular from 'angular'
import {CommonSettingsService} from '../../../services/common-settings/common-settings.service'

interface ILocalAvatarUploaderDirectiveScope extends ng.IScope {
}

class LocalAvatarUploaderDirective implements ng.IDirective {
  public restrict: string = 'A'

  /* @ngInject */
  constructor(private CommonSettingsService: CommonSettingsService) {
  }

  public link = (scope: ILocalAvatarUploaderDirectiveScope, element: any, _attr: ng.IAttributes): void => {
    const digitsCodes: number[] = [this.CommonSettingsService.keyboardKeyCodes.zero,
      this.CommonSettingsService.keyboardKeyCodes.one,
      this.CommonSettingsService.keyboardKeyCodes.two,
      this.CommonSettingsService.keyboardKeyCodes.three,
      this.CommonSettingsService.keyboardKeyCodes.four,
      this.CommonSettingsService.keyboardKeyCodes.five,
      this.CommonSettingsService.keyboardKeyCodes.six,
      this.CommonSettingsService.keyboardKeyCodes.seven,
      this.CommonSettingsService.keyboardKeyCodes.eight,
      this.CommonSettingsService.keyboardKeyCodes.nine]
    const validCodes: number[] = [this.CommonSettingsService.keyboardKeyCodes.backspace,
      this.CommonSettingsService.keyboardKeyCodes.arrowRight,
      this.CommonSettingsService.keyboardKeyCodes.arrowLeft]

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
          case this.CommonSettingsService.keyboardKeyCodes.escape:
            goToPrevElement()
            break
          case this.CommonSettingsService.keyboardKeyCodes.arrowRight:
            goToNextElement()
            break
          case this.CommonSettingsService.keyboardKeyCodes.arrowLeft:
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

  public static getInstance = (): (CommonSettingsService: CommonSettingsService) => LocalAvatarUploaderDirective => {
    const instance = (CommonSettingsService: CommonSettingsService): LocalAvatarUploaderDirective =>
      new LocalAvatarUploaderDirective(CommonSettingsService)
    instance.$inject = ['CommonSettingsService']
    return instance
  }
}

const focusNext =  angular.module('profitelo.directives.interface.focus-next', [])
  .directive('focusNext', LocalAvatarUploaderDirective.getInstance())
  .name

export default focusNext
