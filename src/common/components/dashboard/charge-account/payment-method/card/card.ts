import * as angular from 'angular'
import {MoneyDto, PaymentLink} from 'profitelo-api-ng/model/models'

export interface ITransaction {
  amount: MoneyDto
  paymentCountryId: string
  paymentOption: MoneyDto
  paymentSystemId: string
}

// TODO TO BE FIXED after charge-account typing fix.
export interface ICardPaymentFormComponentBindings {
  paymentsLinks: Array<PaymentLink>
  amountMethodModal: any
  paymentCountryId: string
}

export class CardPaymentFormComponentController implements ng.IController, ICardPaymentFormComponentBindings {
  isInvoice: boolean
  onBraintreeFormLoad: boolean
  paymentCountryId: string
  transaction: ITransaction
  paymentsLinks: Array<PaymentLink>
  amountMethodModal: any

  $onInit = () => {
    this.transaction = {
      amount: this.amountMethodModal.amountModel.cashAmount,
      paymentCountryId: this.paymentCountryId,
      paymentOption: this.amountMethodModal.amountModel.amount,
      paymentSystemId: this.amountMethodModal.paymentSystemModel.id
    }
  }
  /* @ngInject */
  constructor(private $state: ng.ui.IStateService) {
    this.isInvoice = false
    this.onBraintreeFormLoad = false
  }

  public onLoad = (): void => {
    this.onBraintreeFormLoad = true
  }

  public onSucceed = (): void => {
    this.$state.go('app.dashboard.client.activities')
  }
}

class CardPaymentFormComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = CardPaymentFormComponentController
  template = require('./card.pug')()
  replace: true
  bindings: {[boundProperty: string]: string} = {
    paymentsLinks: '<',
    amountMethodModal: '<',
    paymentCountryId: '<'
  }
}

angular.module('profitelo.components.dashboard.charge-account.payment-method.card', [
  'pascalprecht.translate',
  'ui.router',
  'profitelo.components.interface.preloader',
  'profitelo.components.braintree-form',
])
  .component('cardPaymentForm', new CardPaymentFormComponent())
