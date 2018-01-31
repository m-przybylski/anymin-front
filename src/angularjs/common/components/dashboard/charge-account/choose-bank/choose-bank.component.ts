import { ChooseBankComponentController } from './choose-bank.controller';
// tslint:disable:member-ordering
export class ChooseBankComponent implements ng.IComponentOptions {
  public template = require('./choose-bank.html');
  public controller: ng.Injectable<ng.IControllerConstructor> = ChooseBankComponentController;
  public controllerAs = '$ctrl';
  public transclude = true;
  public bindings: {[boundProperty: string]: string} = {
    title: '@',
    paymentsLinks: '<',
    bankModel: '=?',
    onBankSelect: '<'
  };
}
