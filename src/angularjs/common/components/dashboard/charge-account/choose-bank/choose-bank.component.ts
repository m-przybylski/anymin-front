import {ChooseBankComponentController} from './choose-bank.controller'
export class ChooseBankComponent implements ng.IComponentOptions {
  template = require('./choose-bank.html')
  controller: ng.Injectable<ng.IControllerConstructor> = ChooseBankComponentController
  controllerAs: string = '$ctrl'
  transclude: boolean = true
  bindings: {[boundProperty: string]: string} = {
    title: '@',
    paymentsLinks: '<',
    bankModel: '=?',
    onBankSelect: '<'
  }
}
