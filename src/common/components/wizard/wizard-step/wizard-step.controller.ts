import {IWizardStepModuleComponentBindings} from './wizard-step'
import {WizardHandlerComponentController} from '../wizard-handler/wizard-handler.controller'

export class WizardStepComponentController implements IWizardStepModuleComponentBindings {
  public title: string
  public additionalText: string
  public tooltipText: string
  public buttonTitle: string
  public wizardHandler: WizardHandlerComponentController
  public checkIsStepValid: () => void
  public isActive: boolean = false
  public isShowed: boolean = false
  public onGoToNext: () => void
  public onGoBack: () => void
  public required: boolean
  public isCompany: boolean = true

  /* @ngInject */
  constructor(private $element: ng.IRootElementService, private $timeout: ng.ITimeoutService) {
  }

  public onClickNext = () => {
    if (typeof this.checkIsStepValid === 'undefined' || this.checkIsStepValid()) {
      this.wizardHandler.goToNextWizardStep()
    }
    if (this.onGoToNext && typeof this.onGoToNext === 'function') {
      this.onGoToNext()
    }
  }

  public onClickBack = () => {
    this.wizardHandler.goToPreviousWizardStep()
    if (this.onGoBack && typeof this.onGoBack === 'function') {
      this.onGoBack()
    }
  }

  public checkIsDisabled = () => {
    return typeof this.checkIsStepValid === 'undefined' || this.checkIsStepValid()
  }

  $onInit = () => {
    this.$timeout(() => {
      this.isActive = this.wizardHandler.currentStep === this.$element[0]
    })
  }

  $doCheck = () => {
    if (!this.buttonTitle || this.isCompany) {
      this.buttonTitle = 'WIZARD.STEP.BUTTON.NEXT'
    }

    this.isActive = this.wizardHandler.currentStep === this.$element[0]
    if (this.isActive) {
      this.isShowed = this.isActive
    }
  }
}
