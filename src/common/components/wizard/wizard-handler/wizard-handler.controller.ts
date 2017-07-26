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

  /* @ngInject */
  constructor(private $element: ng.IRootElementService,
              private smoothScrollingService: SmoothScrollingService, private $window: ng.IWindowService,
              private $document: ng.IDocumentService, private $timeout: ng.ITimeoutService) {
  }

  $postLink(): void {
    this.$timeout(() => {
      this.currentStep = this.$element.find('wizard-step')[0]
      this.stepList = this.$element.find('wizard-step')

      this.smoothScrollingService.wizardScrollTo(this.currentStep, (this.currentStep.clientHeight - 50),
        this.$window.innerHeight)

      this.progressWidth = (100 / this.stepList.length)
      this.progressStyle = {
        width: this.progressWidth + '%'
      }
      this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]

      if (this.findInput) {
        this.findInput.focus()
      }
      this.$document.bind('scroll', (event: Event) => {
        event.preventDefault()
        const currentScrollPosition = this.$window.pageYOffset

        this.stepList.each((index, _element): boolean => {
          if (currentScrollPosition + this.$window.innerHeight / 2
            < this.stepList[index].offsetTop + this.stepList[index].clientHeight) {
            if (this.onStepChange) {
              this.onStepChange()
            }

            if (this.findInput) {
              this.findInput.blur()
            }

            this.currentStep = this.stepList[index]
            this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]
            this.findTextarea = this.currentStep.children[0].querySelectorAll('textarea')[0]

            if (this.findInput) {
              this.findInput.focus()
            } else if (this.findTextarea) {
              this.findTextarea.focus()
            }

            this.progressStyle = {
              width: this.progressWidth * index + this.progressWidth + '%'
            }
            return false
          }
          return true
        })
      })
    })
  }

  $onDestroy(): void {
    this.$document.unbind('scroll')
  }

  public goToNextWizardStep = (): void => {
    this.indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
    if (this.indexOfCurrentStep + 1 < this.stepList.length) {
      this.smoothScrollingService.wizardScrollTo(
        this.stepList[this.indexOfCurrentStep + 1],
        this.$element.find('wizard-step')[this.indexOfCurrentStep + 1].clientHeight,
        this.$window.innerHeight)
    }
  }

  public goToPreviousWizardStep = (): void => {
    this.indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
    if (this.currentStep !== this.$element.find('wizard-step')[0]) {
      this.smoothScrollingService.wizardScrollTo(
        this.stepList[this.indexOfCurrentStep - 1],
        this.$element.find('wizard-step')[this.indexOfCurrentStep - 1].clientHeight,
        this.$window.innerHeight)
    }
  }
}
