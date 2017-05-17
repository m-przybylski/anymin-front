import {IProfileCompanyConsultationComponentBindings} from './profile-company-single-consultation'
import {Tag, GetOrganizationServiceDetails, GetService, GetProfileDetails} from 'profitelo-api-ng/model/models'
import {CallService} from '../../communicator/call.service'
import {UserService} from '../../../services/user/user.service'
export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  service: GetOrganizationServiceDetails
  tags: Array<Tag>
  employees: Array<GetProfileDetails>

  /* @ngInject */
  constructor(private callService: CallService, private userService: UserService,
              private $state: ng.ui.IStateService) {

  }

  public startCall = (consultation: GetService) => {
    this.userService.getUser()
    .then(() => this.callService.callServiceId(consultation.id), () => this.$state.go('app.login.account'))
  }
}
