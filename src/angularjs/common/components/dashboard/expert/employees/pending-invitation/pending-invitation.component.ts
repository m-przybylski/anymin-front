// tslint:disable:no-require-imports
import { PendingInvitationComponentController } from './pending-invitation.controller';
// tslint:disable:member-ordering
export class PendingInvitationComponent implements ng.IComponentOptions {
  public controller: ng.Injectable<ng.IControllerConstructor> = PendingInvitationComponentController;
  public template = require('./pending-invitation.html');
  public bindings: {[boundProperty: string]: string} = {
    invitations: '<',
    onDeleteCallback: '<'
  };
}
