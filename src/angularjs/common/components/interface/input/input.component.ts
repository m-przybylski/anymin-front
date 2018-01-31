import { InputComponentController } from './input.controller';

export class InputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputComponentController;
  template = require('./input.html');
  bindings: {[boundProperty: string]: string} = {
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
