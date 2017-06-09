import {WizardAvatarComponentController} from './wizard-avatar.controller'
export class WizardAvatarComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = WizardAvatarComponentController
  template = require('./wizard-avatar.pug')()
  bindings: {[boundProperty: string]: string} = {
    avatarToken: '=?',
    isValid: '<',
    isSubmitted: '<',
    validationText: '@'
  }
}
