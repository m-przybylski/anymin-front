import {IWizardHandlerComponentBindings} from './wizard-handler'
import {SmoothScrollingService} from '../../../services/smooth-scrolling/smooth-scrolling.service'
import * as _ from 'lodash'
export class WizardHandlerComponentController implements IWizardHandlerComponentBindings, ng.IController {

  public currentStep: HTMLElement
  public onStepChange: () => void
  private stepList: JQuery

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

      this.$document.bind('scroll', (event: Event) => {
        event.preventDefault()
        let currentScrollPosition = this.$window.pageYOffset
        const indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
        if (currentScrollPosition > scrollPosition) {
          if (indexOfCurrentStep + 1 < this.stepList.length
            && currentScrollPosition + 450 >= this.stepList[indexOfCurrentStep + 1].offsetTop
            && currentScrollPosition + 450 <= this.stepList[indexOfCurrentStep + 1].offsetTop + 400) {
            if (this.onStepChange) {
              this.onStepChange()
            }
            this.currentStep = this.stepList[indexOfCurrentStep + 1]
          }
        } else {
          if (indexOfCurrentStep - 1 > -1
            && currentScrollPosition + 450 >= this.stepList[indexOfCurrentStep - 1].offsetTop
            && currentScrollPosition + 450 <= this.stepList[indexOfCurrentStep - 1].offsetTop + 400) {
            if (this.onStepChange) {
              this.onStepChange()
            }
            this.currentStep = this.stepList[indexOfCurrentStep - 1]
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
    if (this.currentStep !== this.$element.find('wizard-step')[0]) {
      const indexOfCurrentStep = _.findIndex(this.stepList, (step) => this.currentStep === step)
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
