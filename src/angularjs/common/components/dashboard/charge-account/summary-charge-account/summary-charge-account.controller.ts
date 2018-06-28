// tslint:disable:readonly-array
// tslint:disable:no-empty
import { MoneyDto } from 'profitelo-api-ng/model/models';
import { ISummaryChargeAccountComponentBindings } from './summary-charge-account';

// tslint:disable:member-ordering
export class SummaryChargeAccountComponentController implements ng.IController, ISummaryChargeAccountComponentBindings {

  public amount: MoneyDto;
  public static $inject = [];

  constructor() {
  }
}
