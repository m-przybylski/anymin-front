import {InputPriceComponentController} from './input-price.controller'

export class InputPriceComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputPriceComponentController
  template = require('./input-price.html')
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    inputText: '@',
    placeholder: '@',
    isSubmitted: '<',
    ngModel: '=',
    currency: '@',
    inputValueCallback: '<',
    isValid: '<',
    isDisabled: '<'
  }
}
