import {ExpertEmployeeComponentController} from './employee.controller'
export class ExpertEmployeeComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ExpertEmployeeComponentController
  template = require('./employee.html')
  bindings: {[boundProperty: string]: string} = {
    profileWithEmployments: '<',
    onDeleteCallback: '<'
  }
}
