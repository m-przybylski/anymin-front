import {ActiveCallBarComponentController} from './active-call-bar.controller'
export class ActiveCallBarComponent implements ng.IComponentOptions {
  template = require('./active-call-bar.pug')()
  controller: ng.Injectable<ng.IControllerConstructor> = ActiveCallBarComponentController
  bindings: {[boundProperty: string]: string} = {
  }
}
