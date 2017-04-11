import {IExpertActivityComponentBindings} from './activity'
import {ModalsService} from '../../../../../services/modals/modals.service'

export class ExpertActivityComponentController implements ng.IController, IExpertActivityComponentBindings {
  public isCallActivity: boolean

  /* @ngInject */
  constructor(private modalsService: ModalsService) {
    this.isCallActivity = true
  }

  public openActivityDescriptions = () => {
    const sueId = 'sueMock'
    this.modalsService.createExpertSUEActivityDetailsModal(sueId)
  }
}
