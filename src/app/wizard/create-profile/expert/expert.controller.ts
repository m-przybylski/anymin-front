import {SmoothScrollingService} from '../../../../common/services/smooth-scrolling/smooth-scrolling.service'
import * as _ from 'lodash'

export class ExpertController implements ng.IController {
  public inputText: string = ''
  public inputMaxLength: number = 150

  public currentStep: HTMLElement
  private stepsList: JQuery

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private $element: ng.IRootElementService,
              private smoothScrollingService: SmoothScrollingService) {
  }

  $onInit = () => {
    this.currentStep = this.$element.find('wizard-step')[0]
    this.stepsList = this.$element.find('wizard-step')

    this.smoothScrollingService.simpleScrollTo(this.currentStep)
  }

  // Buttons Methods:
  public goNextOnName = () => {
    if (this.nameInputIsValid()) {
      this.goToNextWizardStep()
    }
  }

  public goBackOnName = () => {
    this.$state.go('app.wizard.create-profile')
  }

  // Validations Methods:
  private nameInputIsValid = () => {
    return true
  }

  // Wizards Flow Methods:
  private goToNextWizardStep = () => {
    const indexOfCurrentStep = _.findIndex(this.stepsList, (step) => this.currentStep === step)
    this.currentStep = this.stepsList[indexOfCurrentStep + 1]
    console.log(this.currentStep, indexOfCurrentStep)
    this.smoothScrollingService.simpleScrollTo(this.currentStep)
  }

}
