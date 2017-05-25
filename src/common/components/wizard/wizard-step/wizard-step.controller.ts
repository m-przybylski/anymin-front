import {IWizardStepModuleComponentBindings} from './wizard-step'

export class WizardStepModuleComponentController implements IWizardStepModuleComponentBindings {
  public title: string
  public onChangeNext: () => void
  public onChangePreview: () => void

  /* @ngInject */
  constructor() {}

  public onClickNext = () => {
    this.onChangeNext()
  }

  public onClickPreview = () => {
    this.onChangePreview()
  }

}
