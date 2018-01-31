import { IProfileSingleConsultationComponentBindings } from './profile-single-consultation';
import { Tag, GetService, GetProfile } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../services/user/user.service';
import { PrecallService } from '../../communicator/precall-service/precall.service';
import { StateService } from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class ProfileSingleConsultationComponentController implements IProfileSingleConsultationComponentBindings {

  public service: GetService;
  public tags: Tag[];
  public ownerCompany: GetProfile;
  public profileId: string;

  public static $inject = ['precallService', 'userService', '$state'];

    constructor(private precallService: PrecallService, private userService: UserService,
              private $state: StateService) {
  }

  public startCall = (): void => {
    this.userService.getUser()
    .then(() => this.precallService.openPrecallModal(this.service, this.ownerCompany),
      () => this.$state.go('app.login.account'));
  }
}
