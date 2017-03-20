import * as angular from 'angular'
import {ProfileSingleConsultationComponent} from './profile-single-consultation.component'
import {Tag, GetExpertServiceDetails} from 'profitelo-api-ng/model/models'
export interface IProfileSingleConsultationComponentBindings extends ng.IController {
  service: GetExpertServiceDetails
  tags: Array<Tag>
}

const ProfileSingleConsultationModule = angular.module('profitelo.components.profile.profile-single-consultation', [
])
.component('profileSingleConsultation', new ProfileSingleConsultationComponent())
  .name

export default ProfileSingleConsultationModule
