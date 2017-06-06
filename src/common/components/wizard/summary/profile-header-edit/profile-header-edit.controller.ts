import {IProfileHeaderEditComponentBindings, ProfileTypes} from './profile-header-edit'
import {GetExpertDetails, ProfileDocument} from 'profitelo-api-ng/model/models'

export class ProfileHeaderEditComponentController implements IProfileHeaderEditComponentBindings {

  profileDetails?: GetExpertDetails
  profileType: ProfileTypes
  documents: Array<ProfileDocument>
  editLink: string = ''

  /* @ngInject */
  constructor() {}

  $onInit = () => {
    if (this.profileDetails) {
      this.documents = this.profileDetails.files
    }

    if (this.profileType) {
      this.editLink = 'app.wizard.create-profile.expert'
    } else {
      this.editLink = 'app.wizard.create-profile.company'
    }
  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

}
