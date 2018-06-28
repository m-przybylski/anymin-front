// tslint:disable:no-require-imports
import { CookieNotificationComponentController } from './cookie-notification.controller';
// tslint:disable:member-ordering
export class CookieNotificationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = CookieNotificationComponentController;
  public template = require('./cookie-notification.html');
  public bindings: {[boundProperty: string]: string} = {};
}
