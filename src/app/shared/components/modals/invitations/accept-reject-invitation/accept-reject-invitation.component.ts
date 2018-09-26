import { Component, Inject, OnInit } from '@angular/core';
import { INVITATION } from './services/accept-reject-invitation';
import { AcceptRejectInvitatioService } from './services/accept-reject-invitation.service';
import { IInvitation } from '@platform/features/dashboard/views/user-dashboard/invitations/services/invitation-list.resolver.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { MoneyToAmount, LoggerFactory } from '@anymind-ng/core';

@Component({
  templateUrl: 'accept-reject-invitation.component.html',
  styleUrls: ['accept-reject-invitation.component.sass'],
  providers: [AcceptRejectInvitatioService],
})
export class AcceptRejectInvitationModalComponent extends Logger implements OnInit {
  public isFreelance: boolean;
  public price: string;
  public grossPrice: string;

  // consultation
  public avatarToken: string;
  public expertName: string;
  public serviceName: string;
  public serviceDescription: string;
  public tagList: ReadonlyArray<string> = [];

  private pipe: MoneyToAmount;
  constructor(
    @Inject(INVITATION) public invitation: IInvitation,
    private activeModal: NgbActiveModal,
    private acceptRejectInvitatioService: AcceptRejectInvitatioService,
    private loader: ModalAnimationComponentService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
    this.pipe = new MoneyToAmount(this.loggerService);
  }
  public ngOnInit(): void {
    this.loader.startLoadingAnimation();
    if (!this.invitation.isVisited) {
      this.acceptRejectInvitatioService.markInvitationAsRead(this.invitation.id).subscribe();
    }
    this.acceptRejectInvitatioService
      .getInvitationDetails(this.invitation)
      .pipe(finalize(() => this.loader.stopLoadingAnimation()))
      .subscribe(data => {
        this.avatarToken = this.invitation.serviceOwnerAvatarToken;
        this.expertName = this.invitation.serviceOwnerName;
        this.serviceName = this.invitation.serviceName;
        this.serviceDescription = data.serviceDescription;
        this.isFreelance = data.isFreelance;
        this.price = this.pipe.transform(data.price);
        this.grossPrice = this.pipe.transform(data.grossPrice);
      });
  }
  public onRejectClicked = (): void => {
    this.acceptRejectInvitatioService.rejectInvitation(this.invitation.id, this.activeModal).subscribe();
  };

  public onAcceptClicked = (): void => {
    this.acceptRejectInvitatioService.acceptInvitation(this.invitation.id, this.activeModal).subscribe();
  };
}
