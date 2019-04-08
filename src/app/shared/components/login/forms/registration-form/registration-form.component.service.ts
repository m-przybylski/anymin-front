import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { RegisterActions } from '@platform/core/actions';
import { PostAccount } from '@anymind-ng/api';

@Injectable()
export class RegistrationFormComponentService {
  constructor(
    private registrationInvitationService: RegistrationInvitationService,
    private store: Store<fromCore.IState>,
  ) {}

  public register(postAccount: PostAccount, modal = true): void {
    if (modal) {
      this.store.dispatch(new RegisterActions.RegisterByModalAction({ ...postAccount }));
    } else {
      this.store.dispatch(new RegisterActions.RegisterAction({ ...postAccount }));
    }
  }

  public getLoginFromInvitation(): string | undefined {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return invitationObject && invitationObject.email;
  }
}
