import {IProfileCompanyConsultationComponentBindings} from './profile-company-single-consultation'
import {Tag, GetOrganizationServiceDetails, GetService, GetProfileDetails} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'
import {ClientCallService} from '../../communicator/call-services/client-call.service';

export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  service: GetOrganizationServiceDetails
  tags: Tag[]
  employees: GetProfileDetails[]

  /* @ngInject */
  constructor(private clientCallService: ClientCallService, private userService: UserService,
              private $state: ng.ui.IStateService) {

  }

  public startCall = (consultation: GetService): void => {
    this.userService.getUser()
    .then(() => this.clientCallService.callServiceId(consultation.id), () => this.$state.go('app.login.account'))
  }
}
