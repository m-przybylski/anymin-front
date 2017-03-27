import {IProfileCompanyConsultationComponentBindings} from './profile-company-single-consultation'
import {Tag, GetOrganizationServiceDetails, GetService, GetProfileDetails} from 'profitelo-api-ng/model/models'
import {CallService} from '../../communicator/call.service'
export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  service: GetOrganizationServiceDetails
  tags: Array<Tag>
  employees: Array<GetProfileDetails>

  /* @ngInject */
  constructor(private callService: CallService) {

  }

  public startCall = (consultation: GetService) => {
    this.callService.callServiceId(consultation.id)
  }
}
