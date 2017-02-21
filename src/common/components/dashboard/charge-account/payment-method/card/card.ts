namespace profitelo.components.dashboard.chargeAccount.paymentMethod.cardPaymentForm {

  export class CardPaymentFormComponentController implements ng.IController {
    isInvoice : boolean

    /* @ngInject */
    constructor() {
      this.isInvoice = false
    }
  }

  class PayPalPaymentFormComponent implements ng.IComponentOptions {
    controllerAs: '$ctrl'
    controller: ng.Injectable<ng.IControllerConstructor> = CardPaymentFormComponentController
    templateUrl: string =  'components/dashboard/charge-account/payment-method/card/card.tpl.html'
    replace: true
  }


  angular.module('profitelo.components.dashboard.charge-account.card', [
    'pascalprecht.translate',
    'profitelo.swaggerResources',
    'c7s.ng.userAuth'
  ])
  .component('cardPaymentForm', new PayPalPaymentFormComponent())
}
