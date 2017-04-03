import {NoContentMessageComponentController} from './no-content-message.controller'

export class NoContentMessageComponent implements ng.IComponentOptions {
  controllerAs: '$ctrl'
  controller: ng.Injectable<ng.IControllerConstructor> = NoContentMessageComponentController
  template = require('./no-content-message.pug')()
  replace: true
  bindings: {[boundProperty: string]: string} = {
    iconSrc: '@',
    messageTitle: '@',
    messageDescription: '@',
    buttonTitle: '@',
    buttonClass: '@',
    buttonIconLeftClass: '@',
    buttonIconRightClass: '@'
  }
}
