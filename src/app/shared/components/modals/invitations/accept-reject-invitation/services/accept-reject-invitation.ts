import { InjectionToken } from '@angular/core';
import { IInvitation } from '@platform/features/dashboard/views/user-dashboard/invitations/services/invitation-list.resolver.service';

export const INVITATION: InjectionToken<IInvitation> = new InjectionToken(
  'Invitation id provided in accept reject invitation',
);
