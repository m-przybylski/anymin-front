import {ProfileCompanyConsultationComponentController} from './profile-company-single-consultation.controller'
export class ProfileCompanyConsultationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileCompanyConsultationComponentController
  template = require('./profile-company-single-consultation.pug')()
  bindings: {[boundProperty: string]: string} = {
    service: '<',
    tags: '<'
  }
}
