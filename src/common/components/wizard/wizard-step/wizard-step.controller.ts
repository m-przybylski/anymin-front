import {IWizardStepModuleComponentBindings} from './wizard-step'
import {WizardHandlerComponentController} from '../wizard-handler/wizard-handler.controller'

export class WizardStepComponentController implements IWizardStepModuleComponentBindings {
  public title: string
  public additionalText: string
  public tooltipText: string
  public wizardHandler: WizardHandlerComponentController
  public checkIsStepValid: () => void
  public isActive: boolean = false

  /* @ngInject */
  constructor(private $element: JQuery, private $timeout: ng.ITimeoutService) {
  }

  public onClickNext = () => {
    if (typeof this.checkIsStepValid === 'undefined' || this.checkIsStepValid()) {
      this.wizardHandler.goToNextWizardStep()
    }
  }

  public onClickBack = () => {
    this.wizardHandler.goToPreviousWizardStep()
  }

  $onInit = () => {
    this.$timeout(() => {
      this.isActive = this.wizardHandler.currentStep === this.$element[0]
    })
  }

  $doCheck = () => {
    this.isActive = this.wizardHandler.currentStep === this.$element[0]
  }
}
