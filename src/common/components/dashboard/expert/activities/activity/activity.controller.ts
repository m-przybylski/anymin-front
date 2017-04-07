import {IExpertActivityComponentBindings} from './activity'

export class ExpertActivityComponentController implements ng.IController, IExpertActivityComponentBindings {

  public isCallActivity: boolean
  /* @ngInject */
  constructor() {

    this.isCallActivity = true

  }

}
