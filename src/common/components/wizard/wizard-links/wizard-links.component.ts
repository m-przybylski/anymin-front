import {WizardLinksComponentController} from './wizard-links.controller'
export class WizardLinksComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = WizardLinksComponentController
  template = require('./wizard-links.pug')()
  bindings: {[boundProperty: string]: string} = {
    selectedLinks: '=?'
  }
}
