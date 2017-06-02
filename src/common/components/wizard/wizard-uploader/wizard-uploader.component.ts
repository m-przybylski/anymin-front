import {WizardUploaderComponentController} from './wizard-uploader.controller'
export class WizardUploaderComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = WizardUploaderComponentController
  template = require('./wizard-uploader.pug')()
  bindings: {[boundProperty: string]: string} = {
    tokenList: '=?'
  }
}
