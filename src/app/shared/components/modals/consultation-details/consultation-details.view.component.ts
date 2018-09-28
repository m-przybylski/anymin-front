import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { ConsultationDetailsViewService, IConsultationDetails } from './consultation-details.view.service';
import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { EmploymentWithService, GetComment } from '@anymind-ng/api';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { IConsultationFooterData } from './consultation-footer-wrapper/consultation-footer-wrapper.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-consultation-details-view',
  templateUrl: './consultation-details.view.component.html',
  styleUrls: ['./consultation-details.view.component.sass'],
  providers: [ConsultationDetailsViewService],
})
export class ConsultationDetailsViewComponent implements OnInit {
  public readonly avatarSize96: AvatarSizeEnum = AvatarSizeEnum.X_96;
  public readonly modalType: ModalContainerTypeEnum = ModalContainerTypeEnum.NO_PADDING;

  public serviceName: string;
  public serviceDescription: string;
  public registeredAt: Date;
  public tagList: ReadonlyArray<string> = [];
  public expertName: string;
  public companyName: string;
  public companyLogo: string;
  public expertAvatar: string;
  public consultation: EmploymentWithService;
  public usageCounter: number;
  public commentCounter: number;
  public ratingCounter: number;
  public commentsConsultation: ReadonlyArray<GetComment> = [];
  public employmentId: string;
  public ifMaxCommentsLengthReached = false;
  public isCommentsRequestPending = false;
  public isPending = true;
  public accountId: string;
  public isOwner: boolean;
  public footerData: IConsultationFooterData;

  @Input()
  public serviceId: string;

  @Input()
  public expertId: string;

  constructor(
    private store: Store<fromCore.IState>,
    private consultationDetailsViewService: ConsultationDetailsViewService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activeModal: NgbActiveModal,
  ) {}

  public ngOnInit(): void {
    forkJoin(
      this.store.pipe(
        select(fromCore.getSession),
        take(1),
      ),
      this.consultationDetailsViewService.getServicesTagList(this.serviceId),
      this.consultationDetailsViewService.getServiceDetails(this.serviceId, this.expertId),
      this.consultationDetailsViewService.getExpertAvailability(this.expertId),
    ).subscribe(([getSession, tags, getServiceDetails, expertIsAvailable]) => {
      if (getSession !== undefined) {
        this.accountId = getSession.account.id;
      }
      this.tagList = tags;
      this.footerData = this.buildFooterData(this.accountId, getServiceDetails, expertIsAvailable);
      this.assignExpertConsultationDetails(getServiceDetails);
    });
  }

  public onAddAnswer = (commentsList: GetComment): ReadonlyArray<GetComment> =>
    (this.commentsConsultation = this.consultationDetailsViewService.addTemporaryComment(
      commentsList,
      this.commentsConsultation,
    ));

  public onLoadMoreComments = (): void => {
    const commentOffset = this.commentsConsultation.length;
    const commentLimitLength = 10;
    this.isCommentsRequestPending = true;

    this.consultationDetailsViewService
      .getComments(this.employmentId, commentLimitLength.toString(), commentOffset.toString())
      .subscribe((commentsList: ReadonlyArray<GetComment>) => {
        this.ifMaxCommentsLengthReached = commentsList.length < commentLimitLength;
        this.isCommentsRequestPending = false;
        this.commentsConsultation = this.consultationDetailsViewService.loadMoreComments(
          commentsList,
          this.commentsConsultation,
        );
      });
  };

  public onEditConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onRemoveConsultationClick = (): void => {
    this.consultationDetailsViewService.removeConsultation(this.serviceId, this.activeModal);
  };
  public onCallConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onNotifyConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onLeaveConsultationClick = (): void => {
    this.consultationDetailsViewService.leaveConsultation(this.serviceId, this.employmentId, this.activeModal);
  };
  public onInviteConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };

  private buildFooterData = (
    userId: string,
    getServiceDetails: IConsultationDetails,
    expertIsAvailable: boolean,
  ): IConsultationFooterData => ({
    userId,
    ownerId: getServiceDetails.getServiceWithEmployees.serviceDetails.ownerProfile.id,
    expertsIdList: getServiceDetails.expertIds,
    isExpertAvailable: expertIsAvailable,
    isFreelance: getServiceDetails.getServiceWithEmployees.serviceDetails.isFreelance,
    defaultPayment: getServiceDetails.payment,
    accountBalance: getServiceDetails.balance,
    price: {
      grossPrice: getServiceDetails.getServiceWithEmployees.serviceDetails.grossPrice,
      price: getServiceDetails.getServiceWithEmployees.serviceDetails.netPrice,
    },
  });
  private assignExpertConsultationDetails = ({
    expertDetails,
    expertProfileViewDetails,
    getServiceWithEmployees,
    getComments,
  }: IConsultationDetails): void => {
    const maxCommentsForInitialLoad = 3;
    this.serviceName = getServiceWithEmployees.serviceDetails.name;
    this.serviceDescription = getServiceWithEmployees.serviceDetails.description;
    this.registeredAt = getServiceWithEmployees.serviceDetails.createdAt;

    if (expertDetails.profile.organizationDetails !== undefined) {
      this.companyName = expertDetails.profile.organizationDetails.name;
      this.companyLogo = expertDetails.profile.organizationDetails.logo;
    }
    if (expertDetails.profile.expertDetails !== undefined) {
      this.expertName = expertDetails.profile.expertDetails.name;
      this.expertAvatar = expertDetails.profile.expertDetails.avatar;
    }

    this.modalAnimationComponentService.onModalContentChange().next(false);
    this.isPending = false;

    this.expertName = expertProfileViewDetails.expertProfile.name;
    this.expertAvatar = expertProfileViewDetails.expertProfile.avatar;

    const employmentWithService = expertProfileViewDetails.employments.find(
      service => service.serviceDetails.id === this.serviceId,
    );

    this.commentsConsultation = getComments;
    this.ifMaxCommentsLengthReached = getComments.length === maxCommentsForInitialLoad;

    if (employmentWithService !== undefined) {
      this.usageCounter = employmentWithService.usageCounter;
      this.commentCounter = employmentWithService.commentCounter;
      this.ratingCounter = employmentWithService.ratingCounter;
    }
  };
}
