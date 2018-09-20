import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { ConsultationDetailsViewService, IConsultationDetails } from './consultation-details.view.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EmploymentWithService, GetComment, GetService } from '@anymind-ng/api';
import { ExpertProfileView } from '@anymind-ng/api/model/expertProfileView';
import { ModalAnimationComponentService } from '../modal/animation/modal-animation.animation.service';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

@Component({
  selector: 'plat-consultation-details-view',
  templateUrl: './consultation-details.view.component.html',
  styleUrls: ['./consultation-details.view.component.sass'],
  providers: [ConsultationDetailsViewService],
})
export class ConsultationDetailsViewComponent implements OnInit, OnDestroy {
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

  @Input()
  public serviceId: string;

  @Input()
  public expertId: string;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<fromCore.IState>,
    private consultationDetailsViewService: ConsultationDetailsViewService,
    private modalAnimationComponentService: ModalAnimationComponentService,
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.store
      .pipe(
        select(fromCore.getSession),
        take(1),
      )
      .subscribe(session => {
        if (typeof session !== 'undefined') {
          this.accountId = session.account.id;
        }
      });

    this.consultationDetailsViewService.getServicesTagList(this.serviceId).subscribe(tags => (this.tagList = tags));

    this.consultationDetailsViewService
      .getServiceDetails(this.serviceId, this.expertId)
      .subscribe(response => this.assignExpertConsultationDetails(response));
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
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((commentsList: ReadonlyArray<GetComment>) => {
        this.ifMaxCommentsLengthReached = commentsList.length < commentLimitLength;
        this.isCommentsRequestPending = false;
        this.commentsConsultation = this.consultationDetailsViewService.loadMoreComments(
          commentsList,
          this.commentsConsultation,
        );
      });
  };

  private assignServiceDetails = (serviceDetails: GetService): void => {
    this.serviceName = serviceDetails.name;
    this.serviceDescription = serviceDetails.description;
    this.registeredAt = serviceDetails.createdAt;
  };

  private assignExpertConsultationDetails = ({
    expertDetails,
    expertProfileViewDetails,
    getService,
  }: IConsultationDetails): void => {
    this.assignServiceDetails(getService);
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
