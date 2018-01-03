import {IWizardHandlerComponentBindings} from './wizard-handler'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'
import * as _ from 'lodash'

export interface IProgressStyle {
  width: string
}

export class WizardHandlerComponentController implements IWizardHandlerComponentBindings, ng.IController {

  public currentStep: HTMLElement
  public onStepChange: () => void
  public progressStyle: IProgressStyle
  public progressWidth: number
  public indexOfCurrentStep: number
  public progressBarText: string

  private static readonly dividerOnHalf: number = 2
  private findInput: HTMLInputElement
  private findTextarea: HTMLElement
  private progressWidthMax: number = 100
  private wizardStepPadding: number = 50
  private stepList: JQuery

  /* @ngInject */
  constructor(private $element: ng.IRootElementService,
              private smoothScrollingService: SmoothScrollingService,
              private $window: ng.IWindowService,
              private $document: ng.IDocumentService,
              private $timeout: ng.ITimeoutService) {
  }

  $onInit(): void {
    this.$timeout(() => {
      this.currentStep = this.$element.find('wizard-step')[0]
      this.stepList = this.$element.find('wizard-step')
      this.progressWidth = (this.progressWidthMax / this.stepList.length)
      this.progressStyle = {
        width: String(this.progressWidth) + '%'
      }
      this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]

      if (this.findInput) {
        this.findInput.focus()
      }
      this.$document.bind('scroll', (event: Event) => {
        event.preventDefault()
        const currentScrollPosition = this.$window.pageYOffset

        this.stepList.each((index, _element): boolean => {
          if (currentScrollPosition + this.$window.innerHeight / WizardHandlerComponentController.dividerOnHalf
            < this.stepList[index].offsetTop + this.stepList[index].clientHeight) {
            if (this.onStepChange) {
              this.onStepChange()
            }

            this.currentStep = this.stepList[index]
            this.findInput = this.currentStep.children[0].querySelectorAll('input')[0]
            this.findTextarea = this.currentStep.children[0].querySelectorAll('textarea')[0]

            this.focusCurrentInput()

            this.progressStyle = {
              width: String(this.progressWidth * index + this.progressWidth) + '%'
            }
            return false
          }
          return true
        })
      })
      this.smoothScrollingService.wizardScrollTo(this.currentStep,
        (this.currentStep.clientHeight - this.wizardStepPadding), this.$window.innerHeight)
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

  private focusCurrentInput = (): void => {
    if (this.findInput && this.findInput.type !== 'file') {
      this.findInput.focus()
    } else if (this.findTextarea) {
      this.findTextarea.focus()
    } else {
      this.$document.find(document.activeElement).blur()
    }
  }
}
