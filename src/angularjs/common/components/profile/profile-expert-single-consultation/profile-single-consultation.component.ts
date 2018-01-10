import {ProfileSingleConsultationComponentController} from './profile-single-consultation.controller'
export class ProfileSingleConsultationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileSingleConsultationComponentController
  template = require('./profile-single-consultation.html')
  bindings: {[boundProperty: string]: string} = {
    service: '<',
    tags: '<',
    ownerCompany: '<',
    profileId: '<'
  }
}
