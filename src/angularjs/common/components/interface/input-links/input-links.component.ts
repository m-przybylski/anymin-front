import {InputLinksComponentController} from './input-links.controller'
export class InputLinksComponent implements ng.IComponentOptions {
  transclude: boolean = true
  controller: ng.Injectable<ng.IControllerConstructor> = InputLinksComponentController
  template = require('./input-links.html')
  bindings: {[boundProperty: string]: string} = {
    selectedLinks: '=?',
    label: '@'
  }
}
