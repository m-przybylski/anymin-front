import { IProfileSingleConsultationComponentBindings } from './profile-single-consultation';
import { Tag, GetService, GetProfile } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../services/user/user.service';
import { StateService } from '@uirouter/angularjs';

export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  public static $inject = ['userService', '$state'];
  public service: GetService;
  public tags: Tag[];
  public ownerCompany: GetProfile;
  public profileId: string;

  constructor(private userService: UserService,
              private $state: StateService) {
  }

  public startCall = (): void => {
    this.userService.getUser().then(
      () => alert('Sorry, not implemented'),
      () => this.$state.go('app.login.account'));
  }
}
