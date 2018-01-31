import { ChooseAmountChargeComponentController } from './choose-amount-charge.controller';
export class ChooseAmountChargeComponent implements ng.IComponentOptions {
  template = require('./choose-amount-charge.html');
  bindings = {
    title: '@',
    amounts: '<',
    scrollHandler: '<',
    amountModel: '=?',
    currentSection: '=?'
  };
  controller: ng.Injectable<ng.IControllerConstructor> = ChooseAmountChargeComponentController;
}
