import {TooltioComponentController} from './tooltip.controller'

export class TooltipComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = TooltioComponentController
  template = require('./tooltip.pug')()
  bindings: { [boundProperty: string]: string } = {
    tooltipText: '@'
  }
}
