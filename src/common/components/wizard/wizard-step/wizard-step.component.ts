import {WizardStepComponentController} from './wizard-step.controller'

export class WizardStepModuleComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = WizardStepComponentController
  template = require('./wizard-step.pug')()
  require = {
    wizardHandler: '^wizardHandler'
  }
  bindings: {[boundProperty: string]: string} = {
    title: '@',
    checkIsStepValid: '<',
    additionalText: '@',
    tooltipText: '@'

  }
}
