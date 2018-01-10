import {BtnDropdownCallComponentController} from './btn-dropdown-call.controller'

export class BtnDropdownCallComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = BtnDropdownCallComponentController
  template = require('./btn-dropdown-call.html')
  bindings: {[boundProperty: string]: string} = {
    callback: '<',
    buttonText: '@',
    buttonClass: '@'
  }
}
