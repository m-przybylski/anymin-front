import { ValidationAlertComponentController } from './validation-alert.controller';

// tslint:disable:member-ordering
export class ValidationAlertComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ValidationAlertComponentController;
  public template = require('./validation-alert.html');
  public bindings: {[boundProperty: string]: string} = {
    alertText: '@',
    isVisible: '<',
    additionalText: '@'
  };
}
