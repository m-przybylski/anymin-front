// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:no-empty
import { GetExpertDetails, ProfileDocument } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../services/user/user.service';

export interface IProfileHeaderComponentBindings extends ng.IController {
  profileDetails?: GetExpertDetails;
  isFavourite: boolean;
  onLike: () => void;
  profileType: ProfileTypes;
}

export enum  ProfileTypes {
  'company',
  'expert'
}

// tslint:disable:member-ordering
export class ProfileHeaderComponentController implements IProfileHeaderComponentBindings {

  public profileDetails?: GetExpertDetails;
  public isFavourite: boolean;
  public onLike: () => void;
  public profileType: ProfileTypes;
  public documents: ProfileDocument[];
  public isSession = false;

  public static $inject = ['userService'];

    constructor(userService: UserService) {
    userService.getUser().then(() => {
      this.isSession = true;
    });
  }

  public $onInit = (): void => {
  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

}
