// tslint:disable:no-require-imports
// tslint:disable:no-any
import { CardPaymentFormComponentController } from './card.controller';
import { PaymentLink } from 'profitelo-api-ng/model/models';

// TODO TO BE FIXED after charge-account typing fix.
export interface ICardPaymentFormComponentBindings {
  paymentsLinks: PaymentLink[];
  amountMethodModal: any;
  paymentCountryId: string;
  onCardPayment: () => void;
}

// tslint:disable:member-ordering
export class CardPaymentFormComponent implements ng.IComponentOptions {
  public controllerAs: '$ctrl';
  public controller: ng.Injectable<ng.IControllerConstructor> = CardPaymentFormComponentController;
  public template = require('./card.html');
  public bindings: {[boundProperty: string]: string} = {
    paymentsLinks: '<',
    amountMethodModal: '<',
    paymentCountryId: '<',
    onCardPayment: '<'
  };
}
