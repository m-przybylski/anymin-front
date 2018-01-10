
import {PayPalPaymentFormComponentController} from './paypal.controller'
export class PayPalPaymentFormComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = PayPalPaymentFormComponentController
  template = require('./paypal.html')
  bindings: {[boundProperty: string]: string} = {
    paymentsLinks: '<',
    amountMethodModal: '<',
    paymentCountryId: '<',
    onAuthorize: '<'
  }
}
