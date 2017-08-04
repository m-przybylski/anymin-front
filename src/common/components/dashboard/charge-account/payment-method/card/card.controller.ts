import {MoneyDto, PaymentLink} from 'profitelo-api-ng/model/models'
import {ICardPaymentFormComponentBindings} from './card.component';

export interface ITransaction {
  amount: MoneyDto
  paymentCountryId: string
  paymentOption: MoneyDto
  paymentSystemId: string
}

export class CardPaymentFormComponentController implements ng.IController, ICardPaymentFormComponentBindings {
  isInvoice: boolean
  onBraintreeFormLoad: boolean
  paymentCountryId: string
  transaction: ITransaction
  paymentsLinks: PaymentLink[]
  amountMethodModal: any
  onCardPayment: () => void

  $onInit = (): void => {
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
    typeof this.onCardPayment === 'function' ? this.onCardPayment() : this.$state.go('app.dashboard.client.activities')
  }
}
