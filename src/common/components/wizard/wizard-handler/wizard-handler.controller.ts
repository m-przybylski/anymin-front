import {IWizardHandlerComponentBindings} from './wizard-handler'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'
import * as _ from 'lodash'

export interface IProgresStyle {
  width: string
}

export class WizardHandlerComponentController implements IWizardHandlerComponentBindings, ng.IController {

  public currentStep: HTMLElement
  public onStepChange: () => void
  private stepList: JQuery
  public progressStyle: IProgresStyle
  public progressWidth: number

  private readonly wizardOffset = 460

  /* @ngInject */
  constructor(private $state: ng.ui.IStateService, private $element: ng.IRootElementService,
              private smoothScrollingService: SmoothScrollingService, private $window: ng.IWindowService,
              private $timeout: ng.ITimeoutService, private $document: ng.IDocumentService) {
  }

  $onInit() {
    let scrollPosition = 0
    this.$timeout(() => {
      this.currentStep = this.$element.find('wizard-step')[0]
      this.stepList = this.$element.find('wizard-step')
      this.smoothScrollingService.wizardScrollTo(this.currentStep, this.$element.find('wizard-step')[0].clientHeight,
        this.$window.innerHeight)

      this.progressWidth = (100 / this.stepList.length)
      this.progressStyle = {
        width: this.progressWidth + '%'
      }

      this.$document.bind('scroll', (event: Event) => {
        event.preventDefault()
        const currentScrollPosition = this.$window.pageYOffset
        const indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
        if (currentScrollPosition > scrollPosition) {
          if (indexOfCurrentStep + 1 < this.stepList.length
            && currentScrollPosition + this.wizardOffset >= this.stepList[indexOfCurrentStep + 1].offsetTop
            && currentScrollPosition + this.wizardOffset <= this.stepList[indexOfCurrentStep + 1].offsetTop
            + this.wizardOffset) {
            if (this.onStepChange) {
              this.onStepChange()
            }
            this.currentStep = this.stepList[indexOfCurrentStep + 1]
            this.progressStyle = {
              width: this.progressWidth * (indexOfCurrentStep + 1) + this.progressWidth + '%'
            }
          }

        } else {
          if (indexOfCurrentStep - 1 > -1
            && currentScrollPosition + this.wizardOffset >= this.stepList[indexOfCurrentStep - 1].offsetTop
            && currentScrollPosition + this.wizardOffset <= this.stepList[indexOfCurrentStep - 1].offsetTop
            + this.wizardOffset) {
            if (this.onStepChange) {
              this.onStepChange()
            }
            this.currentStep = this.stepList[indexOfCurrentStep - 1]
            this.progressStyle = {
              width: this.progressWidth * (indexOfCurrentStep - 1) + this.progressWidth + '%'
            }
          }

        }
        scrollPosition = currentScrollPosition
      })
    })
  }

  $onDestroy() {
    this.$document.unbind('scroll')
  }

  public goToNextWizardStep = () => {
    const indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
    this.progressStyle = {
      width: this.progressWidth * (indexOfCurrentStep + 1) + this.progressWidth + '%'
    }
    if (indexOfCurrentStep + 1 < this.stepList.length) {
      this.currentStep = this.stepList[indexOfCurrentStep + 1]
      this.smoothScrollingService.wizardScrollTo(this.currentStep, this.$element.find('wizard-step')[0].clientHeight,
        this.$window.innerHeight)
    } else {
      this.$state.go('app.wizard.summary')
    }
    if (this.onStepChange) {
      this.onStepChange()
    }
  }

  public goToPreviousWizardStep = () => {
    const indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
    this.progressStyle = {
      width: this.progressWidth * (indexOfCurrentStep - 1) + this.progressWidth + '%'
    }

    if (this.currentStep !== this.$element.find('wizard-step')[0]) {
      this.currentStep = this.stepList[indexOfCurrentStep - 1]
      this.smoothScrollingService.wizardScrollTo(this.currentStep, this.$element.find('wizard-step')[0].clientHeight,
        this.$window.innerHeight)
    } else {
      this.$state.go('app.wizard.create-profile')
    }
    if (this.onStepChange) {
      this.onStepChange()
    }
  }

}
