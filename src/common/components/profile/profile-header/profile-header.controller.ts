import {IProfileHeaderComponentBindings, ProfileTypes} from './profile-header'
import {GetExpertDetails} from 'profitelo-api-ng/model/models'

export class ProfileHeaderComponentController implements IProfileHeaderComponentBindings {

  profileDetails?: GetExpertDetails
  isFavourite: boolean
  onLike: () => void
  profileType: ProfileTypes

  /* @ngInject */
  constructor() {

  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

}
