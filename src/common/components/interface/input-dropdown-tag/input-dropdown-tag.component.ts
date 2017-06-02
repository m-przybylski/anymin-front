import {InputDropdownTagComponentController} from './input-dropdown-tag.controller'

export class InputDropdownTagComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputDropdownTagComponentController
  template = require('./input-dropdown-tag.pug')()
  bindings: {[boundProperty: string]: string} = {
    label: '@',
    placeholder: '@',
    dictionary: '<',
    selectedItemsValue: '<',
    hintLabel: '@'
  }
}
