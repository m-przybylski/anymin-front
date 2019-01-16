import { Injectable } from '@angular/core';
import { LoggerFactory } from '@anymind-ng/core';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { MsisdnHelperService } from '@platform/core/services/msisdn-helper/msisdn-helper.service';
import { Logger } from '@platform/core/logger';
import { LoginCredentials } from '@anymind-ng/api/model/loginCredentials';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { AuthActions } from '@platform/core/actions';

@Injectable()
export class LoginViewService extends Logger {
  constructor(
    private store: Store<fromCore.IState>,
    private registrationInvitationService: RegistrationInvitationService,
    private msisdnHelper: MsisdnHelperService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('LoginViewService'));
  }

  public login(credentials: LoginCredentials): void {
    this.store.dispatch(new AuthActions.LoginAction(credentials));
  }

  public getPhoneNumberFromInvitation(): string | undefined {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return invitationObject !== undefined && invitationObject.msisdn !== undefined
      ? this.msisdnHelper.getPhoneNumberWithoutPrefix(invitationObject.msisdn)
      : undefined;
  }

  // todo move to store when LoginSuccess action fires
  // private removeInvitation = (phoneNumber: string): void => {
  //   const invitationObject = this.registrationInvitationService.getInvitationObject();
  //   if (invitationObject !== undefined && invitationObject.msisdn && invitationObject.msisdn !== phoneNumber) {
  //     this.registrationInvitationService.removeInvitationObject();
  //   }
  // }
}
