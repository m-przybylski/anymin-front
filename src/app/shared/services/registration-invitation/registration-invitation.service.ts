// tslint:disable:strict-boolean-expressions
// tslint:disable:newline-before-return
import { LocalStorageWrapperService } from '../local-storage/local-storage.service';
import { LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';

export interface IInvitationObject {
  token: string;
  id: string;
  msisdn?: string;
  email?: string;
}

@Injectable()
export class RegistrationInvitationService {
  constructor(
    private logger: LoggerService,
    private localStorageWrapperService: LocalStorageWrapperService,
    private alertService: AlertService,
  ) {}

  public getInvitationObject = (): IInvitationObject | undefined => {
    const stringifyInvitationObject = this.localStorageWrapperService.getItem('invitation');

    if (stringifyInvitationObject) {
      try {
        return JSON.parse(stringifyInvitationObject);
      } catch (error) {
        this.logger.error('RegistrationInvitationService: error when try to parse invitation object ', error);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    }
    return undefined;
  };

  public setInvitationObject = (invitationObject?: IInvitationObject): void => {
    if (typeof invitationObject !== 'undefined') {
      try {
        this.localStorageWrapperService.setItem(
          'invitation',
          JSON.stringify({
            token: invitationObject.token,
            id: invitationObject.id,
            msisdn: invitationObject.msisdn,
            email: invitationObject.email,
          }),
        );
      } catch (error) {
        this.logger.error('RegistrationInvitationService: can not set invitation item ', error);
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      }
    }
  };

  public removeInvitationObject = (): void => {
    try {
      this.localStorageWrapperService.removeItem('invitation');
    } catch (error) {
      this.logger.error('RegistrationInvitationService: can not remove invitation item ', error);
    }
  };

  public removeInvitationForDifferentUser(email?: string): void {
    /**
     * if user provide different login that it is in invitation
     * we have to delete invitation from local storage
     */
    const invitationObject = this.getInvitationObject();
    const loginFromInvitation = invitationObject && invitationObject.email;
    if (loginFromInvitation !== undefined && email !== loginFromInvitation) {
      this.removeInvitationObject();
    }
  }
}
