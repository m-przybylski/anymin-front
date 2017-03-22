import {IProfileSingleConsultationComponentBindings} from './profile-single-consultation'
import {Tag, GetExpertServiceDetails} from 'profitelo-api-ng/model/models'
export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  service: GetExpertServiceDetails
  tags: Array<Tag>

  $onInit = () => {
  }

  /* @ngInject */
  constructor() {

  }
}
