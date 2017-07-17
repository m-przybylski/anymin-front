import {BraintreeFormComponentController} from './braintree-form.controller';

export class BraintreeFormComponent implements ng.IComponentOptions {

  controller: ng.Injectable<ng.IControllerConstructor> = BraintreeFormComponentController
  template = require('./braintree-form.pug')()
  bindings: { [boundProperty: string]: string } = {
    onBraintreeFormLoad: '<',
    onFormSucceed: '<',
    submitButtonTranslate: '@',
    transaction: '=?'
  }
}
