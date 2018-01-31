import { MoneyDto, PaymentLink } from 'profitelo-api-ng/model/models';
import { ICardPaymentFormComponentBindings } from './card.component';
import { StateService } from '@uirouter/angularjs';

export interface ITransaction {
  amount: MoneyDto;
  paymentCountryId: string;
  paymentOption: MoneyDto;
  paymentSystemId: string;
}

// tslint:disable:member-ordering
export class CardPaymentFormComponentController implements ng.IController, ICardPaymentFormComponentBindings {
  public isInvoice: boolean;
  public onBraintreeFormLoad: boolean;
  public paymentCountryId: string;
  public transaction: ITransaction;
  public paymentsLinks: PaymentLink[];
  public amountMethodModal: any;
  public onCardPayment: () => void;

  public $onInit = (): void => {
    this.transaction = {
      amount: this.amountMethodModal.amountModel.cashAmount,
      paymentCountryId: this.paymentCountryId,
      paymentOption: this.amountMethodModal.amountModel.amount,
      paymentSystemId: this.amountMethodModal.paymentSystemModel.id
    };
  }
  public static $inject = ['$state'];

    constructor(private $state: StateService) {
    this.isInvoice = false;
    this.onBraintreeFormLoad = false;
  }

  public onLoad = (): void => {
    this.onBraintreeFormLoad = true;
  }

  public onSucceed = (): void => {
    typeof this.onCardPayment === 'function' ? this.onCardPayment() : this.$state.go('app.dashboard.client.activities');
  }
}
