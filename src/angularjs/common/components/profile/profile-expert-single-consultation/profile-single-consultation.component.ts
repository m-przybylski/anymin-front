// tslint:disable:no-require-imports
import { ProfileSingleConsultationComponentController } from './profile-single-consultation.controller';
// tslint:disable:member-ordering
export class ProfileSingleConsultationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = ProfileSingleConsultationComponentController;
  public template = require('./profile-single-consultation.html');
  public bindings: {[boundProperty: string]: string} = {
    service: '<',
    tags: '<',
    ownerCompany: '<',
    profileId: '<'
  };
}
