import {SummaryChargeAccountComponentController} from './summary-charge-account.controller';

export class SummaryChargeAccountComponent implements ng.IComponentOptions {
  template = require('./summary-charge-account.pug')
  controller: ng.Injectable<ng.IControllerConstructor> = SummaryChargeAccountComponentController
  replace: true
  controllerAs: '$ctrl'
  bindings: {[boundProperty: string]: string} = {
    amount: '<',
    btnTitle: '@'
  }
}
