import {BtnDropdownComponentController} from './btn-dropdown.controller'

export class BtnDropdownComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = BtnDropdownComponentController
  template = require('./btn-dropdown.pug')()
  bindings: {[boundProperty: string]: string} = {
    callback: '<',
    buttonText: '@',
    buttonClass: '@'
  }
}
