import { IProfileCompanyConsultationComponentBindings } from './profile-company-single-consultation';
import {
  Tag, GetOrganizationServiceDetails,
  GetProfile, MoneyDto, GetProfileDetails
} from 'profitelo-api-ng/model/models';
import { UserService } from '../../../services/user/user.service';

export class ProfileCompanyConsultationComponentController implements IProfileCompanyConsultationComponentBindings {

  public static $inject = ['userService', '$location'];
  public organizationServiceDetails: GetOrganizationServiceDetails;
  public tags: Tag[];
  public employees: GetProfileDetails[];
  public ownerProfile: GetProfile;
  public price: MoneyDto;
  public rating: number;
  public usageCounter: number;
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
    this.rating = this.organizationServiceDetails.service.rating;
    this.usageCounter = this.organizationServiceDetails.service.usageCounter;
    this.serviceName = this.organizationServiceDetails.service.name;
  }
}
