import {IProfileHeaderComponentBindings, ProfileTypes} from './profile-header'
import {GetExpertDetails, ProfileDocument} from 'profitelo-api-ng/model/models'

export class ProfileHeaderComponentController implements IProfileHeaderComponentBindings {

  profileDetails?: GetExpertDetails
  isFavourite: boolean
  onLike: () => void
  profileType: ProfileTypes
  documents: Array<ProfileDocument>

  /* @ngInject */
  constructor() {

  }

  $onInit = () => {
    if (this.profileDetails) {
      this.documents = this.profileDetails.files
    }
  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

}
