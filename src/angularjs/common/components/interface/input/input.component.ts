// tslint:disable:no-require-imports
import { InputComponentController } from './input.controller';

// tslint:disable:member-ordering
export class InputComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InputComponentController;
  public template = require('./input.html');
  public bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    type: '@',
    inputText: '@',
    placeholder: '@',
    validationText: '@',
    maxLength: '@',
    isValid: '<',
    ngRequired: '<',
    ngModel: '=',
    isSubmitted: '<',
    onChangeCallback: '<'
  };
}
