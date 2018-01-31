import { InputDropdownTagComponentController } from './input-dropdown-tag.controller';

// tslint:disable:member-ordering
export class InputDropdownTagComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = InputDropdownTagComponentController;
  public template = require('./input-dropdown-tag.html');
  public bindings: {[boundProperty: string]: string} = {
    label: '@',
    placeholder: '@',
    dictionary: '<',
    selectedItemsValue: '<',
    hintLabel: '@',
    isValid: '<',
    isSubmitted: '<',
    validationText: '@'
  };
}
