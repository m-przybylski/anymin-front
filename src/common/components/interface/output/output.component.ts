import {OutputComponentController} from './output.controller'

export class OutputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = OutputComponentController
  template = require('./output.pug')()
  bindings: {[boundProperty: string]: string} = {
    id: '@',
    labelText: '@',
    ngModel: '<',
    value: '<',
    consultationCost: '<',
    callback: '<'
  }
}
