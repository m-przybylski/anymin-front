import {WizardStepModuleComponentController} from './wizard-step.controller'

export class WizardStepModuleComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = WizardStepModuleComponentController
  template = require('./wizard-step.pug')()
  bindings: {[boundProperty: string]: string} = {
    title: '@',
    onClickNext: '<',
    onClickBack: '<'
  }
}
