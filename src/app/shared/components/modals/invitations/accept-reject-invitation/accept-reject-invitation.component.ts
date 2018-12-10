import { Component, Inject, OnInit } from '@angular/core';
import { INVITATION } from './services/accept-reject-invitation';
import { AcceptRejectInvitationService } from './services/accept-reject-invitation.service';
import { IInvitation } from '@platform/features/dashboard/views/user-dashboard/invitations/services/invitation-list.resolver.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { finalize, switchMap, first } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { MoneyToAmount, LoggerFactory, AlertService } from '@anymind-ng/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { CreateProfileModalComponent } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { EMPTY } from 'rxjs';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { COMMISSION, ICommission } from '@platform/core/commission';

@Component({
  templateUrl: 'accept-reject-invitation.component.html',
  styleUrls: ['accept-reject-invitation.component.sass'],
  providers: [AcceptRejectInvitationService],
})
export class AcceptRejectInvitationModalComponent extends Logger implements OnInit {
  public isFreelance: boolean;
  public price: string;
  public grossPrice: string;
  public avatarSize: AvatarSizeEnum = AvatarSizeEnum.X_96;

  // consultation
  public avatarToken: string;
  public expertName: string;
  public serviceName: string;
  public serviceDescription: string;
  public tagList: ReadonlyArray<string> = [];

  private moneyPipe: MoneyToAmount;

  constructor(
    @Inject(INVITATION) public invitation: IInvitation,
    @Inject(COMMISSION) private commissionConfig: ICommission,
    private activeModal: NgbActiveModal,
    private acceptRejectInvitationService: AcceptRejectInvitationService,
    private loader: ModalAnimationComponentService,
    private store: Store<fromRoot.IState>,
    private modalService: NgbModal,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('AcceptRejectInvitationModalComponent'));
    this.moneyPipe = new MoneyToAmount(this.loggerService);
  }

  public ngOnInit(): void {
    this.loader.startLoadingAnimation();
    if (!this.invitation.isVisited) {
      this.acceptRejectInvitationService.markInvitationAsRead(this.invitation.id).subscribe();
    }
    this.acceptRejectInvitationService
      .getInvitationDetails(this.invitation)
      .pipe(finalize(() => this.loader.stopLoadingAnimation()))
      .subscribe(data => {
        this.avatarToken = this.invitation.serviceOwnerAvatarToken;
        this.expertName = this.invitation.serviceOwnerName;
        this.serviceName = this.invitation.serviceName;
        this.serviceDescription = data.serviceDescription;
        this.isFreelance = data.isFreelance;
        this.price = this.moneyPipe.transform({
          amount:
            data.price.amount *
            (1 -
              (this.commissionConfig.freelanceConsultationCompanyCommission +
                this.commissionConfig.freelanceConsultationAnyMindCommission)),
          currency: data.price.currency,
        });
        this.grossPrice = this.moneyPipe.transform(data.grossPrice);
      });
  }

  public onRejectClicked = (): void => {
    this.acceptRejectInvitationService.rejectInvitation(this.invitation.id, this.activeModal).subscribe();
  };

  public onAcceptClicked = (): void => {
    getNotUndefinedSession(this.store)
      .pipe(
        first(),
        switchMap((session: GetSessionWithAccount) => {
          if (session.isExpert) {
            return this.acceptRejectInvitationService.acceptInvitation(this.invitation.id, this.activeModal);
          }
          this.alertService.pushWarningAlert('INVITATIONS.ACCEPT_REJECT_MODAL.EXPERT_ACCOUNT_WARNING_ALERT');
          this.modalService.open(CreateProfileModalComponent);

          return EMPTY;
        }),
      )
      .subscribe();
  };
}
