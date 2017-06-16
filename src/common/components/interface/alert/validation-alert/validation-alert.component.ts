import {ValidationAlertComponentController} from './validation-alert.controller'

export class ValidationAlertComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ValidationAlertComponentController
  template = require('./validation-alert.pug')()
  bindings: {[boundProperty: string]: string} = {
    alertText: '@',
    isVisible: '<'
  }
}
