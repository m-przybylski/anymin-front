// tslint:disable:no-require-imports
import { SummaryChargeAccountComponentController } from './summary-charge-account.controller';

// tslint:disable:member-ordering
export class SummaryChargeAccountComponent implements ng.IComponentOptions {
  public template = require('./summary-charge-account.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = SummaryChargeAccountComponentController;
  public replace: true;
  public controllerAs: '$ctrl';
  public bindings: {[boundProperty: string]: string} = {
    amount: '<',
    btnTitle: '@'
  };
}
