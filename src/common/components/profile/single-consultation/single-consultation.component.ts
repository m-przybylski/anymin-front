
import {SingleConsultationComponentController} from './single-consultation.controller'
export class SingleConsultationComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = SingleConsultationComponentController
  template = require('./single-consultation.pug')()
  replace: true
  bindings: {[boundProperty: string]: string} = {
  }
}
