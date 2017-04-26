import {ModalsService} from '../../../../common/services/modals/modals.service'
export class DashboardExpertManageProfileController {

  isActive: boolean = true

  /* @ngInject */
  constructor(private modalsService: ModalsService) {

  }

  public openEditProfileModal = () => {
    this.modalsService.createManageProfileEditProfileModal()
  }
}
