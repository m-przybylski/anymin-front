import {IProfileSingleConsultationComponentBindings} from './profile-single-consultation'
import {Tag, GetExpertServiceDetails, GetService} from 'profitelo-api-ng/model/models'
import {CallService} from '../../communicator/call.service'
export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  service: GetExpertServiceDetails
  tags: Array<Tag>

  /* @ngInject */
  constructor(private callService: CallService) {
  }

  public startCall = (consultation: GetService) => {
    this.callService.callServiceId(consultation.id)
  }
}
