// tslint:disable:no-require-imports
import { DropdownPrimaryComponentController } from './dropdown-primary.controller';
// tslint:disable:member-ordering
export class DropdownPrimaryComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = DropdownPrimaryComponentController;
  public template = require('./dropdown-primary.html');
  public bindings: {[boundProperty: string]: string} = {
    label: '@',
    inputPlaceholder: '@',
    name: '@',
    placeholder: '@',
    mainList: '<',
    onSelectMain: '<',
    selectedItem: '=?',
    isSubmitted: '<?',
    isDisabled: '<?',
    validationText: '@',
    isValid: '<'
  };
}
