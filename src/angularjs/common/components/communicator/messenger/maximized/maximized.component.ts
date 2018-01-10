import {MessengerMaximizedComponentController} from './maximized.controller'

export class MessengerMaximizedComponent implements ng.IComponentOptions {
  template = require('./maximized.html')
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerMaximizedComponentController
  bindings: {[boundProperty: string]: string} = {
    callCost: '<',
    isMessenger: '<',
    minimizeMessenger: '<',
    callLength: '<'
  }
}
