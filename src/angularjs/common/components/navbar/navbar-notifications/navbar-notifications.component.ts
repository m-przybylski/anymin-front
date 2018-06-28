// tslint:disable:no-require-imports
import { NavbarNotificationsComponentController } from './navbar-notifications.controller';

// tslint:disable:member-ordering
export class NavbarNotificationsComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = NavbarNotificationsComponentController;
  public template = require('./navbar-notifications.html');
  public bindings: {[boundProperty: string]: string} = {
    isNotificationsTab: '<',
    isInvitationsTab: '<',
    onClick: '<',
    invitations: '<'
  };
}
