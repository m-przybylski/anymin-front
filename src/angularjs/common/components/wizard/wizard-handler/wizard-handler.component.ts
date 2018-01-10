import {WizardHandlerComponentController} from './wizard-handler.controller'
export class WizardHandlerComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = WizardHandlerComponentController
  template = require('./wizard-handler.html')
  bindings: {[boundProperty: string]: string} = {
    onStepChange: '<',
    progressBarText: '@'
  }
}
