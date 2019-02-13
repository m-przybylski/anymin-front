import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { ExpertCompanyActivityDetailsComponentService } from './expert-company-activity-details.component.service';
import { ACTIVITY_DETAILS_DATA } from './expert-company-activity-details-helper';
import { GetProfileActivity } from '@anymind-ng/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepperComponent } from '../../../stepper/stepper.component';
import { roomEvents } from 'machoke-sdk';
import { ISueDetails } from '../components/sue-details/sue-details.component';
import { IFinancialOperationDetails } from '../components/financial-operation-details/financial-operation-details.component';
import { IRefundOperationDetails } from '../components/refund-details/refund-details.component';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/activities/activities.component';
import ActivityTypeEnum = GetProfileActivity.ActivityTypeEnum;

export const MODAL_CLOSED_WITH_ERROR = 'MODAL_CLOSED_WITH_ERROR';

@Component({
  selector: 'activity-details-view',
  templateUrl: './expert-company-activity-details.component.html',
  styleUrls: ['../activity-details.sass'],
  providers: [ExpertCompanyActivityDetailsComponentService],
})
export class ExpertCompanyActivityDetailsComponent extends Logger implements OnInit {
  public activityTypesEnum: typeof ActivityTypeEnum = ActivityTypeEnum;
  public activityType: ActivityTypeEnum;
  public sueDetails: ISueDetails;
  public financialOperationDetails: IFinancialOperationDetails;
  public refundOperationDetails: IRefundOperationDetails;
  public modalHeaderTrKey: string;
  public groupedMessages: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> = [];
  public isChatHistoryVisible = false;
  public clientAvatarUrl: string;
  public expertAvatarUrl: string;
  public isBackwardVisible = false;
  public isCompanyActivity?: boolean;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  private readonly modalHeaderTrKeys = {
    default: 'ACTIVITY_DETAILS.MODAL_HEADER.DEFAULT',
    chatHistory: 'ACTIVITY_DETAILS.MODAL_HEADER.CHAT_HISTORY',
    financial: 'ACTIVITY_DETAILS.MODAL_HEADER.FINANCIAL',
  };
  private readonly initialModalHeight = '100px';

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private expertCompanyActivityDetailsService: ExpertCompanyActivityDetailsComponentService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    @Inject(ACTIVITY_DETAILS_DATA) private activityDetails: IProfileActivitiesWithStatus,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ExpertCompanyActivityDetailsComponent'));
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
    this.isCompanyActivity = this.activityDetails.isCompany;
  }

  public ngOnInit(): void {
    switch (this.activityDetails.activity.activityType) {
      case ActivityTypeEnum.SERVICEUSAGEEVENT:
        this.onSueActivityType(this.activityDetails.activity);
        break;

      case ActivityTypeEnum.REFUND:
        this.onRefundActivityType(this.activityDetails.activity);
        break;

      case ActivityTypeEnum.PAYOUT:
        this.onFinancialActivityType(this.activityDetails.activity);
        break;

      default:
        this.loggerService.error('unhandled activity type', this.activityDetails);
        this.alertService.pushWarningAlert(Alerts.SomethingWentWrong);
        this.activeModal.close(MODAL_CLOSED_WITH_ERROR);
    }
  }

  public onOpenChat(): void {
    this.stepper.next();
    this.modalHeaderTrKey = this.modalHeaderTrKeys.chatHistory;
    this.isBackwardVisible = true;
  }

  public onGoBack(): void {
    this.stepper.previous();
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
    this.isBackwardVisible = false;
  }

  private onSueActivityType(activity: GetProfileActivity): void {
    if (typeof activity.serviceUsageDetails !== 'undefined') {
      this.activityType = ActivityTypeEnum.SERVICEUSAGEEVENT;
      this.expertCompanyActivityDetailsService
        .getCallDetails({
          sueId: activity.serviceUsageDetails.serviceUsageEventId,
          activityId: activity.id,
          isImportantActivity: this.activityDetails.isImportant,
          isCompanyActivity: this.isCompanyActivity,
          ratelRoomId: activity.serviceUsageDetails.ratelRoomId,
        })
        .pipe(
          catchError(err => {
            this.loggerService.warn('Error when try to getCallDetails', err);
            this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
            this.activeModal.close(MODAL_CLOSED_WITH_ERROR);

            return EMPTY;
          }),
        )
        .subscribe(response => {
          this.sueDetails = response.activityDetails;
          this.clientAvatarUrl = response.activityDetails.clientAvatarUrl;
          this.expertAvatarUrl = response.activityDetails.expertAvatarUrl;
          this.isChatHistoryVisible = response.chatHistory.length > 0;
          this.groupedMessages = response.chatHistory;
          this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
        });
    }
  }

  private onFinancialActivityType(activity: GetProfileActivity): void {
    if (
      typeof activity.amount !== 'undefined' &&
      typeof activity.payoutMethod !== 'undefined' &&
      typeof activity.payoutId !== 'undefined'
    ) {
      this.financialOperationDetails = {
        id: activity.payoutId,
        date: activity.initializedAt,
        payoutMethod: activity.payoutMethod,
        payoutValue: activity.amount,
      };
      this.activityType = ActivityTypeEnum.PAYOUT;
      this.modalHeaderTrKey = this.modalHeaderTrKeys.financial;
      this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
    }
  }

  private onRefundActivityType(activity: GetProfileActivity): void {
    if (typeof activity.amount !== 'undefined') {
      this.refundOperationDetails = {
        id: activity.id,
        date: activity.initializedAt,
        refundValue: activity.amount,
      };
    }
    this.activityType = ActivityTypeEnum.REFUND;
    this.modalHeaderTrKey = this.modalHeaderTrKeys.financial;
    this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
  }
}
