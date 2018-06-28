// tslint:disable:no-empty
// tslint:disable:newline-before-return
import { PaymentSystem, GetLastPayment } from 'profitelo-api-ng/model/models';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { IPaymentMethodComponentBindings } from './payment-method.component';

// tslint:disable:strict-type-predicates
// tslint:disable:member-ordering
export class PaymentMethodComponentController implements IPaymentMethodComponentBindings, ng.IController {
  public title: string;
  public paymentSystems: PaymentSystem[];
  public paymentSystemModel: PaymentSystem;
  public scrollHandler: (arg?: number) => void;
  public activeOption: number | null = null;
  public firstSelect = false;
  public lastPayment: GetLastPayment;
  public static $inject = [];

  constructor() {
  }

  public $onInit = (): void => {
    if (this.lastPayment && this.paymentSystemModel !== null) {
      this.activeOption = _.findIndex(this.paymentSystems, (paymentSystem) =>
                                        paymentSystem.id === this.lastPayment.paymentSystemId);
      this.paymentSystemModel = this.paymentSystems[this.activeOption];
    }
  }

  public setImage = (slug: string): string => {
    const imagePath = '/assets/images/%s-logo.png';
    return imagePath.replace('%s', slug);
  }

  public selectPaymentMethod = (index: number): void => {
    this.scrollHandler();
    this.firstSelect = true;

    this.activeOption = index;
    this.paymentSystemModel = this.paymentSystems[index];
  }
}
