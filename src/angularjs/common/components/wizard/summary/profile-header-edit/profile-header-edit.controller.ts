import { GetExpertDetails, ProfileDocument } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../../services/modals/modals.service';

export interface IProfileHeaderEditComponentBindings extends ng.IController {
  profileDetails?: GetExpertDetails;
  profileType: ProfileTypes;
  onDelete?: () => void;
  onEdit?: () => void;
}

export enum ProfileTypes {
  'company',
  'expert'
}

// tslint:disable:strict-type-predicates
// tslint:disable:member-ordering
export class ProfileHeaderEditComponentController implements IProfileHeaderEditComponentBindings {

  public profileDetails?: GetExpertDetails;
  public profileType: ProfileTypes;
  public documents: ProfileDocument[];
  public editLink = '';
  public onDelete?: () => void;
  public onEdit?: () => void;

  public static $inject = ['modalsService'];

  constructor(private modalsService: ModalsService) {
    this.editLink = 'app.wizard.create-profile.expert';
  }

  public $onInit = (): void => {
    if (this.profileDetails) {
      this.documents = this.profileDetails.files;
    }
  }

  public checkType = (): boolean =>
    this.profileType === ProfileTypes.expert

  public deleteProfile = (): void => {
    this.modalsService.createConfirmAlertModal('WIZARD.SUMMARY.DELETE_PROFILE.BUTTON.CONFIRMATION_MESSAGE', () => {
      if (this.onDelete && typeof this.onDelete === 'function') this.onDelete();
    });
  }

  public editProfile = (): void => {
    if (this.onEdit && typeof this.onEdit === 'function') {
      this.onEdit();
    }
  }

}
