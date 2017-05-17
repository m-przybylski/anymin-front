import {IProfileSingleConsultationComponentBindings} from './profile-single-consultation'
import {Tag, GetExpertServiceDetails, GetService, GetProfile} from 'profitelo-api-ng/model/models'
import {CallService} from '../../communicator/call.service'
import {UserService} from '../../../services/user/user.service'
export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  service: GetExpertServiceDetails
  tags: Array<Tag>
  ownerCompany: GetProfile
  profileId: string

  /* @ngInject */
  constructor(private callService: CallService, private userService: UserService,
              private $state: ng.ui.IStateService) {
  }

  public startCall = (consultation: GetService) => {
    this.userService.getUser()
    .then(() => this.callService.callServiceId(consultation.id, this.profileId),
      () => this.$state.go('app.login.account'))
  }
}
