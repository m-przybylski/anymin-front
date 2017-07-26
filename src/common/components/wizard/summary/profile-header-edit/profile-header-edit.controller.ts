import {IProfileHeaderEditComponentBindings, ProfileTypes} from './profile-header-edit'
import {GetExpertDetails, ProfileDocument} from 'profitelo-api-ng/model/models'

export class ProfileHeaderEditComponentController implements IProfileHeaderEditComponentBindings {

  profileDetails?: GetExpertDetails
  profileType: ProfileTypes
  documents: ProfileDocument[]
  editLink: string = ''
  onDelete?: () => void
  onEdit?: () => void

  /* @ngInject */
  constructor() {
    this.editLink = 'app.wizard.create-profile.expert'
  }

  $onInit = (): void => {
    if (this.profileDetails) {
      this.documents = this.profileDetails.files
    }
  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

  public deleteProfile = (): void => {
    if (this.onDelete && typeof this.onDelete === 'function') {
      this.onDelete()
    }
  }

  public editProfile = (): void => {
    if (this.onEdit && typeof this.onEdit === 'function') {
      this.onEdit()
    }
  }

}
