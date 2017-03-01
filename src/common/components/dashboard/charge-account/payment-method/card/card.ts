namespace profitelo.components.dashboard.chargeAccount.paymentMethod.cardPaymentForm {

  export class CardPaymentFormComponentController implements ng.IController {
    isInvoice : boolean
    onBraintreeFormLoad: boolean
    onLoad: any

    /* @ngInject */
    constructor() {
      this.isInvoice = false
      this.onBraintreeFormLoad = false

      this.onLoad = () => {
        this.onBraintreeFormLoad = true
      }
    }
  }

  class CardPaymentFormComponent implements ng.IComponentOptions {
    controllerAs: '$ctrl'
    controller: ng.Injectable<ng.IControllerConstructor> = CardPaymentFormComponentController
    templateUrl: string =  'components/dashboard/charge-account/payment-method/card/card.tpl.html'
    replace: true
  }


  angular.module('profitelo.components.dashboard.charge-account.payment-method.card', [
    'pascalprecht.translate',
    'c7s.ng.userAuth',
    'profitelo.components.interface.preloader',
    'profitelo.components.braintree-form'
  ])
  .component('cardPaymentForm', new CardPaymentFormComponent())
}
