import { TextareaComponentController } from './textarea.controller';

// tslint:disable:member-ordering
export class InputComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = TextareaComponentController;
  public template = require('./textarea.html');
  public bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    inputText: '@',
    placeholder: '@',
    validationText: '@',
    maxLength: '@',
    isValid: '<',
    ngModel: '=',
    isSubmitted: '<',
    onChange: '<',
    ngRequired: '<?'
  };
}
