import {DropdownPrimaryComponentController} from './dropdown-primary.controller'
export class DropdownPrimaryComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = DropdownPrimaryComponentController
  template = require('./dropdown-primary.html')
  bindings: {[boundProperty: string]: string} = {
    label: '@',
    inputPlaceholder: '@',
    name: '@',
    placeholder: '@',
    mainList: '<',
    onSelectMain: '<',
    selectedItem: '=?',
    isSubmitted: '<?',
    validationText: '@',
    isValid: '<'
  }
}
