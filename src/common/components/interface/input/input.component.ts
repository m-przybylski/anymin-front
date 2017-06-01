import {TextareaComponentController} from './textarea.controller'

export class InputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = TextareaComponentController
  template = require('./textarea.pug')()
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    inputText: '@',
    placeholder: '@',
    alertText: '@',
    maxLength: '@',
    validation: '<',
    ngRequired: '<',
    ngModel: '=',
    ngPattern: '=?'
  }
}
