import {InputConsultationEmployeeComponentController} from './input-consultation-employee.controller'

export class InputConsultationEmployeeComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = InputConsultationEmployeeComponentController
  template = require('./input-consultation-employee.pug')()
  bindings: {[boundProperty: string]: string} = {
    addedItemsList: '=?',
    isOwnerEmployee: '=?',
    isValid: '<',
    isSubmitted: '<',
    validationText: '@',
    isCheckboxVisible: '<?'
  }
}
