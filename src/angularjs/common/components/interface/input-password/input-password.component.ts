import { InputPasswordComponentController } from './input-password.controller';

// tslint:disable:member-ordering
export class InputPasswordComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InputPasswordComponentController;
  public template = require('./input-password.html');
  public bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    type: '@',
    inputText: '@',
    placeholder: '@',
    validationText: '@',
    isValid: '<',
    ngRequired: '<',
    ngModel: '=',
    isSubmitted: '<',
    onChange: '<'
  };
}
