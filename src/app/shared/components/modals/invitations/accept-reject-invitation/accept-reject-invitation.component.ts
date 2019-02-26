import { Component, Inject, Injector, OnInit } from '@angular/core';
import { INVITATION } from './services/accept-reject-invitation';
import { AcceptRejectInvitationService } from './services/accept-reject-invitation.service';
import { IInvitation } from '@platform/features/dashboard/views/user-dashboard/invitations/services/invitation-list.resolver.service';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { finalize, switchMap, first } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { MoneyToAmount, LoggerFactory, AlertService } from '@anymind-ng/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';
import {
  IS_EXPERT_FORM,
  SHOW_TOGGLE_EXPERT,
} from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { EMPTY, from, Observable } from 'rxjs';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { ProfileModalsService } from '@platform/shared/components/modals/profile/profile-modals/profile-modals.service';
import { InvitationsApiActions } from '@platform/core/actions';

@Component({
  templateUrl: 'accept-reject-invitation.component.html',
  styleUrls: ['accept-reject-invitation.component.sass'],
  providers: [AcceptRejectInvitationService],
})
export class AcceptRejectInvitationModalComponent extends Logger implements OnInit {
  public isFreelance: boolean;
  public price: string;
  public expertPrice: string;
  public avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_96;

  public isLoaded = false;

  // consultation
  public avatarToken: string;
  public expertName: string;
  public serviceName: string;
  public serviceDescription: string;
  public tagList: ReadonlyArray<string> = [];

  private moneyPipe: MoneyToAmount;

  constructor(
    @Inject(INVITATION) public invitation: IInvitation,
    private activeModal: NgbActiveModal,
    private acceptRejectInvitationService: AcceptRejectInvitationService,
    private loader: ModalAnimationComponentService,
    private store: Store<fromRoot.IState>,
    private alertService: AlertService,
    private profileModalsService: ProfileModalsService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('AcceptRejectInvitationModalComponent'));
    this.moneyPipe = new MoneyToAmount(this.loggerService);
  }

  public ngOnInit(): void {
    if (!this.invitation.isVisited) {
      this.acceptRejectInvitationService.markInvitationAsRead(this.invitation.id).subscribe();
    }
    this.acceptRejectInvitationService
      .getInvitationDetails(this.invitation)
      .pipe(
        finalize(() => {
          this.loader.stopLoadingAnimation();
          this.isLoaded = true;
        }),
      )
      .subscribe(data => {
        this.avatarToken = this.invitation.serviceOwnerAvatarToken;
        this.expertName = this.invitation.serviceOwnerName;
        this.serviceName = this.invitation.serviceName;
        this.serviceDescription = data.serviceDescription;
        this.isFreelance = data.isFreelance;
        this.tagList = data.tagList;
        this.price = this.moneyPipe.transform(data.price);
        this.expertPrice = this.moneyPipe.transform(data.getCommissions.profileAmount);
      });
  }

  public onRejectClicked(): void {
    this.acceptRejectInvitationService.rejectInvitation(this.invitation.id, this.activeModal).subscribe(() => {
      this.store.dispatch(new InvitationsApiActions.DecrementApiInvitationsCounterAction());
    });
  }

  public onAcceptClicked(): void {
    getNotUndefinedSession(this.store)
      .pipe(
        first(),
        switchMap(
          (session: GetSessionWithAccount): Observable<void> => {
            if (session.isExpert) {
              return this.acceptRejectInvitationService.acceptInvitation(this.invitation.id, this.activeModal);
            }
            this.alertService.pushWarningAlert('INVITATIONS.ACCEPT_REJECT_MODAL.EXPERT_ACCOUNT_WARNING_ALERT');

            const options: NgbModalOptions = {
              injector: Injector.create({
                providers: [
                  { provide: IS_EXPERT_FORM, useValue: true },
                  { provide: SHOW_TOGGLE_EXPERT, useValue: true },
                ],
              }),
            };

            const profileModalInstance = this.profileModalsService.openCreateExpertModal(options);

            return from(profileModalInstance).pipe(
              switchMap(status => {
                if (status) {
                  return this.acceptRejectInvitationService.acceptInvitation(this.invitation.id, this.activeModal);
                } else {
                  return EMPTY;
                }
              }),
            );
          },
        ),
      )
      .subscribe(() => {
        this.store.dispatch(new InvitationsApiActions.DecrementApiInvitationsCounterAction());
      });
  }
}
