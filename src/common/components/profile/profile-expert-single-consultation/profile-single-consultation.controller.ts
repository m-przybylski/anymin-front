import {IProfileSingleConsultationComponentBindings} from './profile-single-consultation'
import {Tag, GetService, GetProfile} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'
import {ClientCallService} from '../../communicator/call-services/client-call.service';

export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  service: GetService
  tags: Tag[]
  ownerCompany: GetProfile
  profileId: string

  /* @ngInject */
  constructor(private clientCallService: ClientCallService, private userService: UserService,
              private $state: ng.ui.IStateService) {
  }

  public startCall = (): void => {
    this.userService.getUser()
    .then(() => this.clientCallService.openPrecallModal(this.service, this.ownerCompany),
      () => this.$state.go('app.login.account'))
  }
}
