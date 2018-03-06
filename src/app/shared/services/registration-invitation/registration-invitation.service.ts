import { IInvitationObject } from '../../../../angularjs/app/invitations/invitation.interface';
import { LocalStorageWrapperService } from '../local-storage/local-storage.service';
import { LoggerService } from '@anymind-ng/core';
import { Injectable } from '@angular/core';

@Injectable()
export class RegistrationInvitationService {

  constructor(private logger: LoggerService,
              private localStorageWrapperService: LocalStorageWrapperService) {
  }

  public getInvitationObject = (): IInvitationObject | undefined => {
    const stringifyInvitationObject = this.localStorageWrapperService.getItem('invitation');

    if (stringifyInvitationObject) {
      try {
        return JSON.parse(stringifyInvitationObject);
      } catch (error) {
        this.logger.error('RegistrationInvitationService: error when try to parse invitation object ', error);
      }
    }
    return undefined;
  }
}
