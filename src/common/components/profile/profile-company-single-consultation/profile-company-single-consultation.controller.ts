import {IProfileCompanyConsultationComponentBindings} from './profile-company-single-consultation'
import {Tag, GetExpertServiceDetails} from 'profitelo-api-ng/model/models'
export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  service: GetExpertServiceDetails
  tags: Array<Tag>

  $onInit = () => {
  }

  /* @ngInject */
  constructor() {

  }
}
