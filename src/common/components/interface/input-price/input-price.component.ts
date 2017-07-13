import {InputPriceComponentController} from './input-price.controller'

export class InputPriceComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputPriceComponentController
  template = require('./input-price.pug')()
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    inputText: '@',
    placeholder: '@',
    validationText: '@',
    isValid: '<',
    isSubmitted: '<',
    ngModel: '=',
    currency: '@',
    ngPattern: '<'
  }
}
