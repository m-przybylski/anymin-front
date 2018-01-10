import {SingleConsultationEditComponentController} from './single-consultation-edit.controller'

export class SingleConsultationEditComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = SingleConsultationEditComponentController
  template = require('./single-consultation-edit.html')
  bindings: {[boundProperty: string]: string} = {
    service: '<',
    onRemove: '<',
    onEdit: '<',
    isCompany: '<'
  }
}
