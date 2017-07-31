import {InputPasswordComponentController} from './input-password.controller'

export class InputPasswordComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputPasswordComponentController
  template = require('./input-password.pug')()
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    type: '@',
    inputText: '@',
    placeholder: '@',
    validationText: '@',
    isValid: '<',
    ngRequired: '<',
    ngModel: '=',
    isSubmitted: '<',
    onChange: '<'
  }
}
