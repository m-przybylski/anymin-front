import { LocalStorageWrapper } from '../../classes/local-storage-wrapper/local-storage-wrapper';
import { IInvitationObject } from '../../../app/invitations/invitation.interface';

// tslint:disable:member-ordering
export class RegistrationInvitationService {

  public static $inject = ['$log'];

    constructor(private $log: ng.ILogService) {
  }

  public getInvitationObject = (): IInvitationObject | undefined => {
    const stringifyInvitationObject = LocalStorageWrapper.getItem('invitation');

    if (stringifyInvitationObject) {
      try {
        return JSON.parse(stringifyInvitationObject);
      } catch (error) {
        this.$log.error(error);
      }
    }
    return undefined;
  }
}
