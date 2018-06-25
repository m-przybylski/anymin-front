import * as angular from 'angular';
import { ProfileCompanyConsultationComponent } from './profile-company-single-consultation.component';
import { GetTag, GetProfile } from 'profitelo-api-ng/model/models';
import { ServiceWithEmployments } from 'profitelo-api-ng/model/ServiceWithEmployments';
import { EmploymentWithExpertProfile } from '@anymind-ng/api';

export interface IProfileCompanyConsultationComponentBindings extends ng.IController {
  organizationServiceDetails: ServiceWithEmployments;
  tags: GetTag[];
  employments: EmploymentWithExpertProfile[];
  ownerProfile: GetProfile;
}

const profileCompanyConsultationModule = angular.module(
  'profitelo.components.profile.profile-company-single-consultation', [
])
.component('profileCompanySingleConsultation', new ProfileCompanyConsultationComponent())
  .name;

export default profileCompanyConsultationModule;
