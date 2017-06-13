import {IExpertEmployeeComponentBindings} from './employee'
import {ModalsService} from '../../../../../services/modals/modals.service'

export class ExpertEmployeeComponentController implements IExpertEmployeeComponentBindings {

  public isChecked: boolean

  /* @ngInject */
  constructor(private modalsService: ModalsService) {

    this.isChecked = false

  }

  public openEmployeeDescriptions = (): void => {
    const sueId = 'sueMock'
    this.modalsService.createExpertEmployeeDetailsModal(sueId)
  }

}
