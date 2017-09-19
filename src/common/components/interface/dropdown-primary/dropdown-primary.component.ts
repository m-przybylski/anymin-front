import {DropdownPrimaryComponentController} from './dropdown-primary.controller'
export class DropdownPrimaryComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = DropdownPrimaryComponentController
  template = require('./dropdown-primary.pug')()
  bindings: {[boundProperty: string]: string} = {
    label: '@',
    inputPlaceholder: '@',
    name: '@',
    placeholder: '@',
    mainList: '<',
    onSelectMain: '<',
    selectedItem: '=?',
    isValid: '<',
    validationText: '@',
    callback: '<'
  }
}
