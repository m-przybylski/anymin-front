import {GetExpertDetails, ProfileDocument} from 'profitelo-api-ng/model/models'
import {TranslatorService} from '../../../../services/translator/translator.service'

export interface IProfileHeaderEditComponentBindings extends ng.IController {
  profileDetails?: GetExpertDetails,
  profileType: ProfileTypes,
  onDelete?: () => void
  onEdit?: () => void
}

export enum  ProfileTypes {
  'company',
  'expert'
}

export class ProfileHeaderEditComponentController implements IProfileHeaderEditComponentBindings {

  profileDetails?: GetExpertDetails
  profileType: ProfileTypes
  documents: ProfileDocument[]
  editLink: string = ''
  onDelete?: () => void
  onEdit?: () => void

  /* @ngInject */
  constructor(private translatorService: TranslatorService) {
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
    const confirmWindowMessage: string =
      this.translatorService.translate('WIZARD.SUMMARY.DELETE_PROFILE.BUTTON.CONFIRMATION_MESSAGE')
    if (this.onDelete && typeof this.onDelete === 'function' && confirm(confirmWindowMessage)) {
      this.onDelete()
    }
  }

  public editProfile = (): void => {
    if (this.onEdit && typeof this.onEdit === 'function') {
      this.onEdit()
    }
  }

}
