// tslint:disable:no-require-imports
import { ProfileCompanyConsultationComponentController } from './profile-company-single-consultation.controller';
// tslint:disable:member-ordering
export class ProfileCompanyConsultationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ProfileCompanyConsultationComponentController;
  public template = require('./profile-company-single-consultation.html');
  public bindings: {[boundProperty: string]: string} = {
    organizationServiceDetails: '<',
    tags: '<',
    employees: '<'
  };
}
