import {IProfileHeaderComponentBindings, ProfileTypes} from './profile-header'
import {GetExpertDetails, ProfileDocument} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../services/user/user.service'

export class ProfileHeaderComponentController implements IProfileHeaderComponentBindings {

  profileDetails?: GetExpertDetails
  isFavourite: boolean
  onLike: () => void
  profileType: ProfileTypes
  documents: Array<ProfileDocument>
  isSession: boolean = false

  /* @ngInject */
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
