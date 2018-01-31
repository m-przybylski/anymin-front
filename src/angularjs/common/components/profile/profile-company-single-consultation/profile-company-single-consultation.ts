import * as angular from 'angular';
import { ProfileCompanyConsultationComponent } from './profile-company-single-consultation.component';
import { Tag, GetOrganizationServiceDetails, GetProfileDetails, GetProfile } from 'profitelo-api-ng/model/models';

export interface IProfileCompanyConsultationComponentBindings extends ng.IController {
  organizationServiceDetails: GetOrganizationServiceDetails;
  tags: Tag[];
  employees: GetProfileDetails[];
  ownerProfile: GetProfile;
}

const profileCompanyConsultationModule = angular.module(
  'profitelo.components.profile.profile-company-single-consultation', [
])
.component('profileCompanySingleConsultation', new ProfileCompanyConsultationComponent())
  .name;

export default profileCompanyConsultationModule;
