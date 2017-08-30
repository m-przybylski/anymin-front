import {IProfileCompanyConsultationComponentBindings} from './profile-company-single-consultation'
import {Tag, GetOrganizationServiceDetails, GetProfile, GetProfileDetails} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'
import {PrecallService} from '../../communicator/precall-service/precall.service'

export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  service: GetOrganizationServiceDetails
  tags: Tag[]
  employees: GetProfileDetails[]
  ownerProfile: GetProfile

  /* @ngInject */
  constructor(private precallService: PrecallService,
              private userService: UserService,
              private $state: ng.ui.IStateService) {
  }

  public startCall = (): void => {
    this.userService.getUser()
    .then(() => this.precallService.openPrecallModal(this.service.service, this.ownerProfile),
      () => this.$state.go('app.login.account'))
  }
}
