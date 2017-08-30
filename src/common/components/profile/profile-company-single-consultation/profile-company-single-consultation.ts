import * as angular from 'angular'
import {ProfileCompanyConsultationComponent} from './profile-company-single-consultation.component'
import {Tag, GetOrganizationServiceDetails, GetProfileDetails, GetProfile} from 'profitelo-api-ng/model/models'
import './profile-company-single-consultation.sass'

export interface IProfileCompanyConsultationComponentBindings extends ng.IController {
  service: GetOrganizationServiceDetails
  tags: Tag[]
  employees: GetProfileDetails[]
  ownerProfile: GetProfile
}

const profileCompanyConsultationModule = angular.module(
  'profitelo.components.profile.profile-company-single-consultation', [
])
.component('profileCompanySingleConsultation', new ProfileCompanyConsultationComponent())
  .name

export default profileCompanyConsultationModule
