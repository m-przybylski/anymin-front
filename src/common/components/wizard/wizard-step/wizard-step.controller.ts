import {IWizardStepModuleComponentBindings} from './wizard-step'

export class WizardStepModuleComponentController implements IWizardStepModuleComponentBindings {
  public title: string
  public onClickNext: () => void
  public onClickBack: () => void

  /* @ngInject */
  constructor() {}

}
