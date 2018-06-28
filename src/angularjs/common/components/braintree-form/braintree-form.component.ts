// tslint:disable:no-require-imports
import { BraintreeFormComponentController } from './braintree-form.controller';

// tslint:disable:member-ordering
export class BraintreeFormComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor> = BraintreeFormComponentController;
  public template = require('./braintree-form.html');
  public bindings: { [boundProperty: string]: string } = {
    onBraintreeFormLoad: '<',
    onFormSucceed: '<',
    submitButtonTranslate: '@',
    transaction: '=?'
  };
}
