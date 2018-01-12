import {IProfileCompanyConsultationComponentBindings} from './profile-company-single-consultation'
import {Tag, GetOrganizationServiceDetails,
  GetProfile, MoneyDto, GetProfileDetails} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'
import {PrecallService} from '../../communicator/precall-service/precall.service'
import {StateService} from '@uirouter/angularjs'

export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  public organizationServiceDetails: GetOrganizationServiceDetails
  public tags: Tag[]
  public employees: GetProfileDetails[]
  public ownerProfile: GetProfile
  public price: MoneyDto
  public rating: number
  public usageCounter: number
  public serviceName: string

  static $inject = ['precallService', 'userService', '$state'];

    constructor(private precallService: PrecallService,
              private userService: UserService,
              private $state: StateService) {
  }

  public startCall = (): void => {
    this.userService.getUser()
    .then(() => this.precallService.openPrecallModal(this.organizationServiceDetails.service, this.ownerProfile),
      () => this.$state.go('app.login.account'))
  }

  $onInit = (): void => {
    this.price = this.organizationServiceDetails.service.price
    this.rating = this.organizationServiceDetails.service.rating
    this.usageCounter = this.organizationServiceDetails.service.usageCounter
    this.serviceName = this.organizationServiceDetails.service.name
  }
}
