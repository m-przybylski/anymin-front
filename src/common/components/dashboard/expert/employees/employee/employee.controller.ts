import {IExpertEmployeeComponentBindings} from './employee'

export class ExpertEmployeeComponentController implements IExpertEmployeeComponentBindings {

  public isChecked: boolean

  /* @ngInject */
  constructor() {

    this.isChecked = false

  }

}
