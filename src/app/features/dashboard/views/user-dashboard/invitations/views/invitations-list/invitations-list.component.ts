import { Component, OnDestroy, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvitation } from '../../services/invitation-list.resolver.service';
import { Subject, from, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AcceptRejectInvitationModalComponent } from '@platform/shared/components/modals/invitations/accept-reject-invitation/accept-reject-invitation.component';
import { INVITATION } from '@platform/shared/components/modals/invitations/accept-reject-invitation/services/accept-reject-invitation';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

@Component({
  templateUrl: 'invitations-list.component.html',
  styleUrls: ['invitations-list.component.sass'],
})
export class InvitationsListComponent extends Logger implements OnDestroy {
  public invitations: ReadonlyArray<IInvitation>;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private injector: Injector,
    private router: Router,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('InvitationsListComponent'));
    this.route.data.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(({ data }: { data: ReadonlyArray<IInvitation> }) => {
      this.invitations = data;
    });
  }

  public ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  };

  public onInvitationClicked = (invitationId: string): void => {
    const injector = this.setupInjector(invitationId);

    if (typeof injector === 'undefined') {
      this.loggerService.info('Not able to create injector');

      return;
    }
    const modalOptions: NgbModalOptions = {
      injector: this.setupInjector(invitationId),
    };
    const modal = this.modalService.open(AcceptRejectInvitationModalComponent, modalOptions);
    from(modal.result)
      .pipe(catchError(() => of(true)))
      .subscribe(() => {
        this.loggerService.debug('modal closed');
        this.reloadPage();
      });
  };

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
