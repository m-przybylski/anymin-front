import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { ConsultationDetailsViewService, IConsultationDetails } from './consultation-details.view.service';
import { take, filter } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { EmploymentWithService, GetComment, GetSessionWithAccount } from '@anymind-ng/api';
import { ExpertProfileView } from '@anymind-ng/api/model/expertProfileView';
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
  public employeementId: string;
  public ifMaxCommentsLengthReached = false;
  public isCommentsRequestPending = true;
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
        filter(session => typeof session !== 'undefined'),
        take(1),
      ) as Observable<GetSessionWithAccount>,
      this.consultationDetailsViewService.getServicesTagList(this.serviceId),
      this.consultationDetailsViewService.getServiceDetails(this.serviceId, this.expertId),
    ).subscribe(([getSession, tags, getServiceDetails]) => {
      this.accountId = getSession.account.id;
      this.tagList = tags;
      this.footerData = this.buildFooterData(this.accountId, getServiceDetails);
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
      .getComments(this.employeementId, commentLimitLength.toString(), commentOffset.toString())
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
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onCallConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onNotifyConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onLeaveConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };
  public onInviteConsultationClick = (): void => {
    this.consultationDetailsViewService.editConsultation(this.serviceId, this.activeModal);
  };

  private buildFooterData = (userId: string, getServiceDetails: IConsultationDetails): IConsultationFooterData => ({
    userId,
    ownerId: getServiceDetails.getServiceWithEmployees.serviceDetails.ownerProfile.id,
    expertsIdList: getServiceDetails.expertIds,
    // TODO: implement it. For the moment hardcoded
    isExpertAvailable: true,
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
  }: IConsultationDetails): void => {
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

    this.assignExpertConsultationStatistics(expertProfileViewDetails);
    this.getEmployeement(expertProfileViewDetails);
  };

  private getEmployeement = (employementDetails: ExpertProfileView): void => {
    const employeementId = employementDetails.employments.find(item => item.serviceDetails.id === this.serviceId);
    employeementId ? (this.employeementId = employeementId.id) : (this.employeementId = '');

    this.expertName = employementDetails.expertProfile.name;
    this.expertAvatar = employementDetails.expertProfile.avatar;

    this.isOwner = this.checkIsOwner();

    this.getComments(this.employeementId);
  };

  private checkIsOwner = (): boolean => this.expertId === this.accountId;

  private getComments = (employeementId: string): void => {
    this.consultationDetailsViewService.getComments(employeementId).subscribe(commentsList => {
      const commentLimitLength = 3;

      this.isCommentsRequestPending = false;
      this.ifMaxCommentsLengthReached = commentsList.length < commentLimitLength;
      this.commentsConsultation = commentsList;
    });
  };

  private assignExpertConsultationStatistics = (expertDetails: ExpertProfileView): void => {
    const conusltation = expertDetails.employments.filter(service => service.serviceDetails.id === this.serviceId);

    this.usageCounter = conusltation[0] && conusltation[0].usageCounter;
    this.commentCounter = conusltation[0] && conusltation[0].commentCounter;
    this.ratingCounter = conusltation[0] && conusltation[0].ratingCounter;
  };
}
