import {ConsultationEmployeeInputComponentController} from './consultation-employee-input.controller'

export class ConsultationEmployeeInputComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ConsultationEmployeeInputComponentController
  template = require('./consultation-employee-input.pug')()
  bindings: {[boundProperty: string]: string} = {
  }
}
