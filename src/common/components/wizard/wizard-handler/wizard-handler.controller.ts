import {IWizardHandlerComponentBindings} from './wizard-handler'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'
import * as _ from 'lodash'

export interface IProgressStyle {
  width: string
}

export class WizardHandlerComponentController implements IWizardHandlerComponentBindings, ng.IController {

  public currentStep: HTMLElement
  public onStepChange: () => void
  private stepList: JQuery
  public progressStyle: IProgressStyle
  public progressWidth: number
  public indexOfCurrentStep: number
  public progressBarText: string

  private findInput: HTMLElement
  private findTextarea: HTMLElement

  private readonly wizardOffset = 460

  /* @ngInject */
  constructor(private $element: ng.IRootElementService,
              private smoothScrollingService: SmoothScrollingService, private $window: ng.IWindowService,
              private $timeout: ng.ITimeoutService, private $document: ng.IDocumentService) {
  }

  $onInit() {
    let scrollPosition = 0
    this.$timeout(() => {
      this.currentStep = this.$element.find('wizard-step')[0]
      this.stepList = this.$element.find('wizard-step')

      this.$timeout(() => {
        this.smoothScrollingService.wizardScrollTo(this.currentStep, (this.currentStep.clientHeight - 50),
          this.$window.innerHeight)
      })

      this.progressWidth = (100 / this.stepList.length)
      this.progressStyle = {
        width: this.progressWidth + '%'
      }

      this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]
      this.findInput.focus()

      this.$document.bind('scroll', (_event: Event) => {
        _event.preventDefault()

        const currentScrollPosition = this.$window.pageYOffset
        this.indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)

        if (currentScrollPosition > scrollPosition) {
          if (this.indexOfCurrentStep + 1 < this.stepList.length
            && currentScrollPosition + this.wizardOffset >= this.stepList[this.indexOfCurrentStep + 1].offsetTop
            && currentScrollPosition + this.wizardOffset <= this.stepList[this.indexOfCurrentStep + 1].offsetTop
            + this.wizardOffset) {

            if (this.onStepChange) {
              this.onStepChange()
            }

            this.currentStep = this.stepList[this.indexOfCurrentStep + 1]
            this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]
            this.findTextarea = this.currentStep.children[0].querySelectorAll('textarea')[0]

            if (this.findInput) {
              this.findInput.focus()
            } else if (this.findTextarea) {
              this.findTextarea.focus()
            }

            this.progressStyle = {
              width: this.progressWidth * (this.indexOfCurrentStep + 1) + this.progressWidth + '%'
            }
          }

        } else {
          if (this.indexOfCurrentStep - 1 > -1
            && currentScrollPosition + this.wizardOffset >= this.stepList[this.indexOfCurrentStep - 1].offsetTop
            && currentScrollPosition + this.wizardOffset <= this.stepList[this.indexOfCurrentStep - 1].offsetTop
            + this.wizardOffset) {

            if (this.onStepChange) {
              this.onStepChange()
            }
            this.currentStep = this.stepList[this.indexOfCurrentStep - 1]

            this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]
            this.findTextarea = this.currentStep.children[0].querySelectorAll('textarea')[0]

            if (this.findInput) {
              this.findInput.focus()
            } else if (this.findTextarea) {
              this.findTextarea.focus()
            }

            this.progressStyle = {
              width: this.progressWidth * (this.indexOfCurrentStep - 1) + this.progressWidth + '%'
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

  public goToNextWizardStep = (): void => {
    this.indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
    this.progressStyle = {
      width: this.progressWidth * (this.indexOfCurrentStep + 1) + this.progressWidth + '%'
    }
    if (this.indexOfCurrentStep + 1 < this.stepList.length) {
      const nextStep =  this.stepList[this.indexOfCurrentStep + 1]
      this.smoothScrollingService.wizardScrollTo(nextStep, this.$element.find('wizard-step')[this.indexOfCurrentStep + 1].clientHeight,
        this.$window.innerHeight)
    }
  }

  public goToPreviousWizardStep = (): void => {
    this.indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
    this.progressStyle = {
      width: this.progressWidth * (this.indexOfCurrentStep - 1) + this.progressWidth + '%'
    }

    if (this.currentStep !== this.$element.find('wizard-step')[0]) {
      const previousStep = this.stepList[this.indexOfCurrentStep - 1]
      this.smoothScrollingService.wizardScrollTo(previousStep, this.$element.find('wizard-step')[this.indexOfCurrentStep - 1].clientHeight,
        this.$window.innerHeight)
    }
  }
}
