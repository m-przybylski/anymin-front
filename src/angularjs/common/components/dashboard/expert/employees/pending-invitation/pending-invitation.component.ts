import { PendingInvitationComponentController } from './pending-invitation.controller';
export class PendingInvitationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = PendingInvitationComponentController;
  template = require('./pending-invitation.html');
  bindings: {[boundProperty: string]: string} = {
    invitations: '<',
    onDeleteCallback: '<'
  };
}
