import * as angular from "angular"
import sessionModule from "../../../../../services/session/session"

export class PayPalPaymentFormComponentController implements ng.IController {

  /* @ngInject */
  constructor() {
  }
}

class PayPalPaymentFormComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = PayPalPaymentFormComponentController
  template = require('./paypal.jade')()
}


angular.module('profitelo.components.dashboard.charge-account.payment-method.paypal', [
  sessionModule,
  'profitelo.components.dashboard.charge-account.summary-charge-account'
])
  .component('paypalPaymentForm', new PayPalPaymentFormComponent())
