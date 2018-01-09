import {IProfileSingleConsultationComponentBindings} from './profile-single-consultation'
import {Tag, GetService, GetProfile} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'
import {PrecallService} from '../../communicator/precall-service/precall.service'
import {StateService} from '@uirouter/angularjs'

export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  service: GetService
  tags: Tag[]
  ownerCompany: GetProfile
  profileId: string

  /* @ngInject */
  constructor(private precallService: PrecallService, private userService: UserService,
              private $state: StateService) {
  }

  public startCall = (): void => {
    this.userService.getUser()
    .then(() => this.precallService.openPrecallModal(this.service, this.ownerCompany),
      () => this.$state.go('app.login.account'))
  }
}
