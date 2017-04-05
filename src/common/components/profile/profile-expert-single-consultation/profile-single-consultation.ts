import * as angular from 'angular'
import {ProfileSingleConsultationComponent} from './profile-single-consultation.component'
import {Tag, GetExpertServiceDetails, GetProfile} from 'profitelo-api-ng/model/models'
export interface IProfileSingleConsultationComponentBindings extends ng.IController {
  service: GetExpertServiceDetails
  tags: Array<Tag>
  ownerCompany: GetProfile
  profileId: string
}

const ProfileSingleConsultationModule = angular.module('profitelo.components.profile.profile-expert-single-consultation', [
])
.component('profileSingleConsultation', new ProfileSingleConsultationComponent())
  .name

export default ProfileSingleConsultationModule
