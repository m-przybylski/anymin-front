import {MessengerComponentController} from "./messenger.controller"

export class MessengerComponent implements ng.IComponentOptions {
  template = require("./messenger.jade")()
  controller: ng.Injectable<ng.IControllerConstructor> = MessengerComponentController
  bindings: {[boundProperty: string]: string} = {
    callCost: '<',
    isMessenger: '=',
    callLength: '<'
  }
}
