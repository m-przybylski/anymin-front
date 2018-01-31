import { ChooseAmountChargeComponentController } from './choose-amount-charge.controller';
// tslint:disable:member-ordering
export class ChooseAmountChargeComponent implements ng.IComponentOptions {
  public template = require('./choose-amount-charge.html');
  public bindings = {
    title: '@',
    amounts: '<',
    scrollHandler: '<',
    amountModel: '=?',
    currentSection: '=?'
  };
  public controller: ng.Injectable<ng.IControllerConstructor> = ChooseAmountChargeComponentController;
}
