import {MessengerMaximizedComponentController} from './maximized.controller'

export class MessengerMaximizedComponent implements ng.IComponentOptions {
  template = require('./maximized.pug')
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerMaximizedComponentController
  bindings: {[boundProperty: string]: string} = {
    callCost: '<',
    isMessenger: '<',
    minimizeMessenger: '<',
    callLength: '<'
  }
}
