// tslint:disable:no-require-imports

import { PayPalPaymentFormComponentController } from './paypal.controller';
// tslint:disable:member-ordering
export class PayPalPaymentFormComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = PayPalPaymentFormComponentController;
  public template = require('./paypal.html');
  public bindings: {[boundProperty: string]: string} = {
    paymentsLinks: '<',
    amountMethodModal: '<',
    paymentCountryId: '<',
    onAuthorize: '<'
  };
}
