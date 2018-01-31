import { ProfileCompanyConsultationComponentController } from './profile-company-single-consultation.controller';
export class ProfileCompanyConsultationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = ProfileCompanyConsultationComponentController;
  template = require('./profile-company-single-consultation.html');
  bindings: {[boundProperty: string]: string} = {
    organizationServiceDetails: '<',
    tags: '<',
    employees: '<'
  };
}
