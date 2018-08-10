// tslint:disable:strict-boolean-expressions
// tslint:disable:newline-before-return
import { IInvitationObject } from '../../../../angularjs/app/invitations/invitation.interface';
import { LocalStorageWrapperService } from '../local-storage/local-storage.service';
import { LoggerService, Alerts, AlertService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';

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
}
