// tslint:disable:readonly-array
import { IProfileCompanyConsultationComponentBindings } from './profile-company-single-consultation';
import { GetTag, ServiceWithEmployments, GetProfile, MoneyDto } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../services/user/user.service';
import { EmploymentWithExpertProfile } from '@anymind-ng/api';

export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  public static $inject = ['userService', '$location'];
  public organizationServiceDetails: ServiceWithEmployments;
  public tags: GetTag[];
  public employments: EmploymentWithExpertProfile[];
  public ownerProfile: GetProfile;
  public price: MoneyDto;
  public serviceName: string;

  constructor(private userService: UserService,
              private $location: ng.ILocationService) {
  }

  public startCall = (): void => {
    this.userService.getUser().then(
      () => alert('Sorry, not implemented'),
      () => this.$location.path('/login'));
  }

  public $onInit = (): void => {
    this.price = this.organizationServiceDetails.service.price;
    this.serviceName = this.organizationServiceDetails.service.name;
  }
}
