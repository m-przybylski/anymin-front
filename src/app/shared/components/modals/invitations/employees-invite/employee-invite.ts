import { InjectionToken } from '@angular/core';
import { IEmployeeInvitePayload } from './employees-invite.component';

export const INVITATION_PAYLOAD: InjectionToken<IEmployeeInvitePayload> = new InjectionToken(
  'Invitation Payload provided to create employee invitation',
);
