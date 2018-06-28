// tslint:disable:readonly-array
import { IProfileSingleConsultationComponentBindings } from './profile-single-consultation';
import { GetTag, GetService, GetProfile } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../services/user/user.service';

export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  public static $inject = ['userService', '$location'];
  public service: GetService;
  public tags: GetTag[];
  public ownerCompany: GetProfile;
  public profileId: string;

  constructor(private userService: UserService,
              private $location: ng.ILocationService) {
  }

  public startCall = (): void => {
    this.userService.getUser().then(
      () => alert('Sorry, not implemented'),
      () => this.$location.path('/login'));
  }
}
