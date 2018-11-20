import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { ActivityDetailsViewComponentService } from '@platform/shared/components/modals/activity-details/activity-details.view.component.service';
import { ACTIVITY_DETAILS_DATA } from '@platform/shared/components/modals/activity-details/activity-details-helpers';
import { GetClientActivity, GetProfileActivity, GetSessionWithAccount } from '@anymind-ng/api';
import ActivityTypeEnum = GetClientActivity.ActivityTypeEnum;
import { catchError, switchMap, map, filter, first } from 'rxjs/operators';
import { EMPTY, of, BehaviorSubject } from 'rxjs';
import { Logger } from '@platform/core/logger';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProfileActivitiesWithStatus } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { roomEvents } from 'machoke-sdk';
import { ISueDetails } from '@platform/shared/components/modals/activity-details/sue-details/sue-details.component';
import { IFinancialOperationDetails } from '@platform/shared/components/modals/activity-details/financial-operation-details/financial-operation-details.component';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { IRefundOperationDetails } from '@platform/shared/components/modals/activity-details/refund-details/refund-details.component';

export const MODAL_CLOSED_WITH_ERROR = 'MODAL_CLOSED_WITH_ERROR';

@Component({
  selector: 'activity-details-view',
  templateUrl: './activity-details.view.component.html',
  styleUrls: ['./activity-details.view.component.sass'],
  providers: [ActivityDetailsViewComponentService],
})
export class ActivityDetailsViewComponent extends Logger implements OnInit, AfterViewInit {
  public activityTypesEnum: typeof ActivityTypeEnum = ActivityTypeEnum;
  public activityType: ActivityTypeEnum;
  public sueDetails: ISueDetails;
  public financialOperationDetails: IFinancialOperationDetails;
  public refundOperationDetails: IRefundOperationDetails;
  public modalHeaderTrKey: string;
  public groupedMessages: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> = [];
  public isChatHistoryVisible: boolean;
  public clientAvatarUrl: string;
  public expertAvatarUrl: string;
  public isBackwardVisible = false;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  /**
   * used to show if component loaded data from the server
   */
  private componentLoaded = new BehaviorSubject<boolean>(false);
  private accountId: string;
  private readonly modalHeaderTrKeys = {
    default: 'ACTIVITY_DETAILS.MODAL_HEADER.DEFAULT',
    chatHistory: 'ACTIVITY_DETAILS.MODAL_HEADER.CHAT_HISTORY',
    financial: 'ACTIVITY_DETAILS.MODAL_HEADER.FINANCIAL',
  };
  private readonly initialModalHeight = '100px';

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private activityDetailsService: ActivityDetailsViewComponentService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    private store: Store<fromRoot.IState>,
    @Inject(ACTIVITY_DETAILS_DATA) private activityDetails: IProfileActivitiesWithStatus,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ActivityDetailsViewComponent'));
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
    this.store
      .pipe(
        select(fromCore.getSession),
        filter(getSession => typeof getSession !== 'undefined'),
        first(),
      )
      .subscribe((getSession: GetSessionWithAccount) => (this.accountId = getSession.account.id));
  }

  public ngOnInit(): void {
    switch (this.activityDetails.activity.activityType) {
      case ActivityTypeEnum.SERVICEUSAGEEVENT:
        this.onSueActivityType(this.activityDetails.activity);
        break;

      case ActivityTypeEnum.REFUND:
        this.onRefundActivityType(this.activityDetails.activity);
        break;

      case ActivityTypeEnum.FINANCIALTRANSACTION:
        this.onFinancialActivityType(this.activityDetails.activity);
        break;

      default:
        this.loggerService.error('unhandled activity type', this.activityDetails);
        this.alertService.pushWarningAlert(Alerts.SomethingWentWrong);
        this.activeModal.close(MODAL_CLOSED_WITH_ERROR);
    }
  }

  public ngAfterViewInit(): void {
    /**
     * race condition between component load and
     * data load
     */
    this.componentLoaded
      .pipe(
        filter(loaded => loaded),
        first(),
      )
      .subscribe(() => {
        this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
      });
  }

  public onOpenChat = (): void => {
    this.stepper.next();
    this.modalHeaderTrKey = this.modalHeaderTrKeys.chatHistory;
    this.isBackwardVisible = true;
  };

  public onGoBack = (): void => {
    this.stepper.previous();
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
    this.isBackwardVisible = false;
  };

  private getCallDetails = (sueId: string, activityId: string): void => {
    this.activityDetailsService
      .getCallDetails(sueId, this.accountId)
      .pipe(
        catchError(err => {
          this.loggerService.warn('Error when try to getCallDetails', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.activeModal.close(MODAL_CLOSED_WITH_ERROR);

          return EMPTY;
        }),
        switchMap(activityDetails => {
          if (this.activityDetails.isImportant) {
            return this.activityDetailsService.markActivityAsUnimportant(activityId).pipe(map(() => activityDetails));
          }

          return of(activityDetails);
        }),
      )
      .subscribe(activityDetails => {
        this.sueDetails = activityDetails;
        this.clientAvatarUrl = activityDetails.clientAvatarUrl;
        this.expertAvatarUrl = activityDetails.expertAvatarUrl;
      });
  };

  private onSueActivityType = (activity: GetProfileActivity): void => {
    if (typeof activity.serviceUsageDetails !== 'undefined') {
      this.activityType = ActivityTypeEnum.SERVICEUSAGEEVENT;
      this.getCallDetails(activity.serviceUsageDetails.serviceUsageEventId, activity.id);
      if (activity.serviceUsageDetails.ratelRoomId) {
        this.activityDetailsService.getChatHistory(activity.serviceUsageDetails.ratelRoomId).subscribe(
          messages => {
            this.isChatHistoryVisible = messages.length > 0;
            this.groupedMessages = messages;
          },
          undefined,
          () => this.componentLoaded.next(true),
        );
      }
    }
  };

  private onFinancialActivityType = (activity: GetProfileActivity): void => {
    if (
      typeof activity.financialOperation !== 'undefined' &&
      typeof activity.payoutMethod !== 'undefined' &&
      typeof activity.payoutId !== 'undefined'
    ) {
      this.financialOperationDetails = {
        id: activity.payoutId,
        date: activity.initializedAt,
        payoutMethod: activity.payoutMethod,
        payoutValue: activity.financialOperation.operation,
      };
      this.activityType = ActivityTypeEnum.FINANCIALTRANSACTION;
      this.modalHeaderTrKey = this.modalHeaderTrKeys.financial;
      this.componentLoaded.next(true);
    }
  };

  private onRefundActivityType = (activity: GetProfileActivity): void => {
    if (typeof activity.financialOperation !== 'undefined') {
      this.refundOperationDetails = {
        id: activity.id,
        date: activity.initializedAt,
        refundValue: activity.financialOperation.operation,
      };
    }
    this.activityType = ActivityTypeEnum.REFUND;
    this.modalHeaderTrKey = this.modalHeaderTrKeys.financial;
    this.componentLoaded.next(true);
  };
}
