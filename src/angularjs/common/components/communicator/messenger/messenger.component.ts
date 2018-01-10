import {MessengerComponentController} from './messenger.controller'

export class MessengerComponent implements ng.IComponentOptions {
  template = require('./messenger.html')
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerComponentController
  bindings: {[boundProperty: string]: string} = {
    callCost: '<',
    isMessenger: '=',
    callLength: '<'
  }
}
