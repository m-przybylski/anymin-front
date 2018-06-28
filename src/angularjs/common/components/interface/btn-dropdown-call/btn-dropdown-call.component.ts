// tslint:disable:no-require-imports
import { BtnDropdownCallComponentController } from './btn-dropdown-call.controller';

// tslint:disable:member-ordering
export class BtnDropdownCallComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = BtnDropdownCallComponentController;
  public template = require('./btn-dropdown-call.html');
  public bindings: {[boundProperty: string]: string} = {
    callback: '<',
    buttonText: '@',
    buttonClass: '@'
  };
}
