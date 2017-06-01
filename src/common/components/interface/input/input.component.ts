import {InputComponentController} from './input.controller'

export class InputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputComponentController
  template = require('./input.pug')()
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
