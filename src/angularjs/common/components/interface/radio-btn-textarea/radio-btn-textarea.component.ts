// tslint:disable:no-require-imports
import { RadioBtnTextareaComponentController } from './radio-btn-textarea.controller';

// tslint:disable:member-ordering
export class RadioBtnTextareaComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = RadioBtnTextareaComponentController;
  public template = require('./radio-btn-textarea.html');
  public bindings: {[boundProperty: string]: string} = {
    id: '@',
    name: '@',
    value: '@',
    label: '@',
    ngModel: '@',
    checkedItem: '@',
    onSelectedItem: '<',
    onDescriptionCallback: '<',
    isTextarea: '<'
  };
}
