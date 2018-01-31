import * as angular from 'angular';
import { ProfileSingleConsultationComponent } from './profile-single-consultation.component';
import { Tag, GetService, GetProfile } from 'profitelo-api-ng/model/models';

export interface IProfileSingleConsultationComponentBindings extends ng.IController {
  service: GetService;
  tags: Tag[];
  ownerCompany: GetProfile;
  profileId: string;
}

const profileSingleConsultationModule = angular.module(
  'profitelo.components.profile.profile-expert-single-consultation', [
])
.component('profileSingleConsultation', new ProfileSingleConsultationComponent())
  .name;

export default profileSingleConsultationModule;
