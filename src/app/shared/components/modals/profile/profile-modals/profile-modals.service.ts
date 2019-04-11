import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromCore from '../../../../../core/reducers';
import { filter, switchMap, take } from 'rxjs/operators';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { CreateProfileModalComponent } from '../create-profile/create-profile.component';
import { VerifiedEmailService } from '@platform/shared/components/modals/verfied-email/verified-email.service';
import { CreateOrganizationModalComponent } from '@platform/shared/components/modals/profile/create-organization/create-organization.component';
import * as SessionActions from '@platform/core/actions/session.actions';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

@Injectable()
export class ProfileModalsService {
  constructor(
    private modalService: NgbModal,
    private verifiedEmailService: VerifiedEmailService,
    private store: Store<fromCore.IState>,
  ) {}

  public openCreateExpertModal(options: NgbModalOptions = {}): Observable<NgbModalRef> {
    return this.session$.pipe(
      switchMap((sessionWithAccount: GetSessionWithAccount) => {
        if (sessionWithAccount.account.email !== undefined) {
          return from(this.modalService.open(CreateProfileModalComponent, options).result);
        }

        return this.verifiedEmailService.openVerifiedEmailDialog(
          'VERIFIED_EMAIL_MODAL.EXPERT_HEADER',
          'VERIFIED_EMAIL_MODAL.EXPERT_CONTENT',
        );
      }),
    );
  }

  public openCreateCompanyModal(options: NgbModalOptions = {}): Observable<NgbModalRef> {
    return this.session$.pipe(
      switchMap((sessionWithAccount: GetSessionWithAccount) => {
        if (sessionWithAccount.account.email !== undefined) {
          return from(this.modalService.open(CreateOrganizationModalComponent, options).result);
        }

        return this.verifiedEmailService.openVerifiedEmailDialog(
          'VERIFIED_EMAIL_MODAL.ORGANIZATION_HEADER',
          'VERIFIED_EMAIL_MODAL.ORGANIZATION_CONTENT',
        );
      }),
    );
  }

  private get session$(): Observable<GetSessionWithAccount> {
    return this.store.pipe(
      select(fromCore.getSession),
      filter(getSessionWithAccount => typeof getSessionWithAccount !== 'undefined'),
      take(1),
      switchMap((getSessionWithAccount: GetSessionWithAccount) =>
        typeof getSessionWithAccount.account.email === 'undefined' ? this.refreshSession$ : of(getSessionWithAccount),
      ),
    );
  }

  private get refreshSession$(): Observable<GetSessionWithAccount> {
    this.store.dispatch(new SessionActions.FetchSessionForProfileCreationAction());

    return getNotUndefinedSession(this.store);
  }
}
