import * as angular from 'angular'
import {ProfileCompanyConsultationComponent} from './profile-company-single-consultation.component'
import {Tag, GetExpertServiceDetails} from 'profitelo-api-ng/model/models'
import './profile-company-single-consultation.sass'

export interface IProfileCompanyConsultationComponentBindings extends ng.IController {
  service: GetExpertServiceDetails
  tags: Array<Tag>
}

const ProfileCompanyConsultationModule = angular.module('profitelo.components.profile.profile-company-single-consultation', [
])
.component('profileCompanySingleConsultation', new ProfileCompanyConsultationComponent())
  .name

export default ProfileCompanyConsultationModule
