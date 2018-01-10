import {MoneyDto} from 'profitelo-api-ng/model/models'
import {ISummaryChargeAccountComponentBindings} from './summary-charge-account';

export class SummaryChargeAccountComponentController implements ng.IController, ISummaryChargeAccountComponentBindings {

  public amount: MoneyDto
  constructor() {
  }
}
