import {SmoothScrollingService} from '../../../../common/services/smooth-scrolling/smooth-scrolling.service'
import * as _ from 'lodash'

export class ExpertController implements ng.IController {
  public inputText: string = ''
  public inputMaxLength: number = 150

  public currentStep: HTMLElement
  private stepsList: JQuery

  // Models:
  public nameModel: string

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private $element: ng.IRootElementService,
              private smoothScrollingService: SmoothScrollingService, private $window: ng.IWindowService) {
  }

  $onInit = () => {
    this.currentStep = this.$element.find('wizard-step')[0]
    this.stepsList = this.$element.find('wizard-step')

    this.smoothScrollingService.wizardScrollTo(this.currentStep, this.$element.find('wizard-step')[0].clientHeight,
    this.$window.innerHeight)
  }

  // Buttons Methods:
  public goNextOnName = () => {
    if (this.nameInputIsValid()) {
      this.goToNextWizardStep()
    }
  }

  public goBack = () => {
    if (this.currentStep === this.$element.find('wizard-step')[0]) {
      this.$state.go('app.wizard.create-profile')
    } else {
      this.goToPreviousWizardStep()
    }
  }

  // Validations Methods:
  private nameInputIsValid = () => {
    return this.nameModel.length > 2
  }

  // Wizards Flow Methods:
  private goToNextWizardStep = () => {
    const indexOfCurrentStep = _.findIndex(this.stepsList, (step) => this.currentStep === step)
    if (indexOfCurrentStep + 1 < this.stepsList.length) {
      this.currentStep = this.stepsList[indexOfCurrentStep + 1]
      this.smoothScrollingService.wizardScrollTo(this.currentStep, this.$element.find('wizard-step')[0].clientHeight,
        this.$window.innerHeight)
    } else {
      this.$state.go('app.wizard.summary')
    }
  }

  private goToPreviousWizardStep = () => {
    const indexOfCurrentStep = _.findIndex(this.stepsList, (step) => this.currentStep === step)
    this.currentStep = this.stepsList[indexOfCurrentStep - 1]
    this.smoothScrollingService.wizardScrollTo(this.currentStep, this.$element.find('wizard-step')[0].clientHeight,
      this.$window.innerHeight)
  }
}
