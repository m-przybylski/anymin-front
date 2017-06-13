import {IProfileSingleConsultationComponentBindings} from './profile-single-consultation'
import {Tag, GetExpertServiceDetails, GetService, GetProfile} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'
import {ClientCallService} from '../../communicator/call-services/client-call.service';

export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  service: GetExpertServiceDetails
  tags: Array<Tag>
  ownerCompany: GetProfile
  profileId: string

  /* @ngInject */
  constructor(private clientCallService: ClientCallService, private userService: UserService,
              private $state: ng.ui.IStateService) {
  }

  public startCall = (consultation: GetService) => {
    this.userService.getUser()
    .then(() => this.clientCallService.callServiceId(consultation.id, this.profileId),
      () => this.$state.go('app.login.account'))
  }
}
