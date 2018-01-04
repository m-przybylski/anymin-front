import {CookieNotificationComponentController} from './cookie-notification.controller'
export class CookieNotificationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = CookieNotificationComponentController
  template = require('./cookie-notification.pug')
  bindings: {[boundProperty: string]: string} = {}
}
