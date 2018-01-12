import {GetExpertDetails, ProfileDocument} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'

export interface IProfileHeaderComponentBindings extends ng.IController {
  profileDetails?: GetExpertDetails,
  isFavourite: boolean,
  onLike: () => void,
  profileType: ProfileTypes
}

export enum  ProfileTypes {
  'company',
  'expert'
}

export class ProfileHeaderComponentController implements IProfileHeaderComponentBindings {

  profileDetails?: GetExpertDetails
  isFavourite: boolean
  onLike: () => void
  profileType: ProfileTypes
  documents: ProfileDocument[]
  isSession: boolean = false

  static $inject = ['userService'];

    constructor(userService: UserService) {
    userService.getUser().then(() => {
      this.isSession = true
    })
  }

  $onInit = (): void => {
    if (this.profileDetails) {
      this.documents = this.profileDetails.files
    }
  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

}
