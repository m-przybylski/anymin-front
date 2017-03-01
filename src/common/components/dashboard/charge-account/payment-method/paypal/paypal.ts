namespace profitelo.components.dashboard.chargeAccount.paymentMethod.paypalPaymentForm {

  export class PayPalPaymentFormComponentController implements ng.IController {

    /* @ngInject */
    constructor() {
    }
  }

  class PayPalPaymentFormComponent implements ng.IComponentOptions {
    controllerAs: '$ctrl'
    controller: ng.Injectable<ng.IControllerConstructor> = PayPalPaymentFormComponentController
    templateUrl: string =  'components/dashboard/charge-account/payment-method/paypal/paypal.tpl.html'
    replace: true
  }


  angular.module('profitelo.components.dashboard.charge-account.payment-method.paypal', [
    'profitelo.services.session',
    'profitelo.components.dashboard.charge-account.summary-charge-account'
  ])
    .component('paypalPaymentForm', new PayPalPaymentFormComponent())

}
