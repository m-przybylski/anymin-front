// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:no-require-imports
import { PaymentMethodComponentController } from './payment-method.controller';
import { PaymentSystem } from 'profitelo-api-ng/model/models';

export interface IPaymentMethodComponentBindings {
  title: string;
  paymentSystems: PaymentSystem[];
  paymentSystemModel: PaymentSystem;
  scrollHandler: (_arg?: number) => void;
}

// tslint:disable:member-ordering
export class PaymentMethodComponent implements ng.IComponentOptions {
  public template = require('./payment-method.html');
  public bindings = {
    title: '@',
    paymentSystems: '<',
    paymentSystemModel: '=?',
    scrollHandler: '<',
    lastPayment: '<'
  };
  public controller = PaymentMethodComponentController;
}
