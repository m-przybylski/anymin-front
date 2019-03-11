import { Component, OnDestroy, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvitation } from '../../services/invitation-list.resolver.service';
import { Subject, from, of } from 'rxjs';
import { takeUntil, catchError, map } from 'rxjs/operators';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AcceptRejectInvitationModalComponent } from '@platform/shared/components/modals/invitations/accept-reject-invitation/accept-reject-invitation.component';
import { INVITATION } from '@platform/shared/components/modals/invitations/accept-reject-invitation/services/accept-reject-invitation';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';
import { RegistrationInvitationService } from '@platform/shared/services/registration-invitation/registration-invitation.service';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { ITranslateParamObject } from '@platform/shared/components/warning-information/warning-information.component';

@Component({
  templateUrl: 'invitations-list.component.html',
  styleUrls: ['invitations-list.component.sass'],
})
export class InvitationsListComponent extends Logger implements OnDestroy, OnInit {
  public invitations: ReadonlyArray<IInvitation>;
  public unverifiedEmail: ITranslateParamObject = {
    email: '',
  };

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private injector: Injector,
    private router: Router,
    private store: Store<fromCore.IState>,
    private registrationInvitationService: RegistrationInvitationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('InvitationsListComponent'));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({ data }: { data: ReadonlyArray<IInvitation> }) => {
      this.invitations = data;
      const invitationObject = this.registrationInvitationService.getInvitationObject();
      if (invitationObject && invitationObject.id) {
        this.onOpenInvitation(invitationObject.id);
        this.registrationInvitationService.removeInvitationObject();
      }
    });
    getNotUndefinedSession(this.store)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        map(session => session.account.unverifiedEmail),
      )
      .subscribe((unverifiedEmail?: string) => {
        typeof unverifiedEmail !== 'undefined'
          ? (this.unverifiedEmail.email = unverifiedEmail)
          : (this.unverifiedEmail.email = '');
      });
  }

  public onOpenInvitation = (invitationId: string): void => {
    const injector = this.setupInjector(invitationId);

    if (typeof injector === 'undefined') {
      this.loggerService.warn('Not able to create injector');

      return;
    }
    this.openInvitationModal(injector);
  };

  private openInvitationModal(injector: Injector): void {
    const modalOptions: NgbModalOptions = {
      injector,
    };
    const modal = this.modalService.open(AcceptRejectInvitationModalComponent, modalOptions);
    from(modal.result)
      .pipe(catchError(() => of(true)))
      .subscribe(() => {
        this.loggerService.debug('modal closed');
        this.reloadPage();
      });
  }

  private getInvitation = (invitationId: string): IInvitation | undefined =>
    this.invitations.find(invitation => invitation.id === invitationId);

  private setupInjector = (invitationId: string): Injector | undefined => {
    const invitation = this.getInvitation(invitationId);
    if (typeof invitation === 'undefined') {
      this.loggerService.info('Cannot find selected invitation');

      return undefined;
    }

    return Injector.create({ providers: [{ provide: INVITATION, useValue: invitation }], parent: this.injector });
  };

  private reloadPage = (): void => {
    void this.router.navigate([], { relativeTo: this.route });
  };
}
