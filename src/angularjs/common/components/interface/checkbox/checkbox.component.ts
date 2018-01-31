import { CheckboxComponentController } from './checkbox.controller';

// tslint:disable:member-ordering
export class CheckboxComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = CheckboxComponentController;
  public template = require('./checkbox.html');
  public bindings: {[boundProperty: string]: string} = {
    inputText: '@',
    additionalText: '@',
    inputTextTranslationParam: '<',
    name: '@',
    alertText: '@',
    validation: '<',
    ngModel: '=',
    isDisabled: '<',
    ngRequired: '<',
    onChange: '<'
  };
}
