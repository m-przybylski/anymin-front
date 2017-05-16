import {CheckboxComponentController} from './checkbox.controller'

export class CheckboxComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = CheckboxComponentController
  template = require('./checkbox.pug')()
  bindings: {[boundProperty: string]: string} = {
    inputText: '@',
    additionalText: '@',
    ngModel: '<',
    isDisabled: '<',
    isRequired: '<',
    onChange: '<'
  }
}
