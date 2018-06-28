// tslint:disable:no-require-imports
import { InputPriceComponentController } from './input-price.controller';

// tslint:disable:member-ordering
export class InputPriceComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InputPriceComponentController;
  public template = require('./input-price.html');
  public bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    inputText: '@',
    placeholder: '@',
    isSubmitted: '<',
    ngModel: '=',
    currency: '@',
    inputValueCallback: '<',
    onPatternValidation: '<',
    isDisabled: '<',
    isValid: '<'
  };
}
