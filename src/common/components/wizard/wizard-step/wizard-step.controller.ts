import {IWizardStepModuleComponentBindings} from './wizard-step'
import {WizardHandlerComponentController} from '../wizard-handler/wizard-handler.controller'

export class WizardStepComponentController implements IWizardStepModuleComponentBindings {
  public title: string
  public additionalText: string
  public tooltipText: string
  public wizardHandler: WizardHandlerComponentController
  public checkIsStepValid: () => void
  public isActive: boolean = false
  public isShowed: boolean = false
  public onGoToNext: () => void

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
  }

  $onInit = () => {
    this.$timeout(() => {
      this.isActive = this.wizardHandler.currentStep === this.$element[0]
    })
  }

  $doCheck = () => {
    this.isActive = this.wizardHandler.currentStep === this.$element[0]
    if (this.isActive) {
      this.isShowed =  this.isActive
    }
  }
}
