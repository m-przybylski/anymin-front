// tslint:disable:max-file-line-count
import { Component, Inject, OnInit } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { ISueDetails } from '@platform/shared/components/modals/activity-details/components/sue-details/sue-details.component';
import { roomEvents } from 'machoke-sdk';
import { EMPTY } from 'rxjs';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { LoggerFactory } from '@anymind-ng/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize } from 'rxjs/operators';
import { GetClientActivity, GetClientComplaint } from '@anymind-ng/api';
import { MODAL_CLOSED_WITH_ERROR } from '@platform/shared/components/modals/activity-details/expert-company-details/expert-company-activity-details.component';
import ActivityTypeEnum = GetClientActivity.ActivityTypeEnum;
import { CLIENT_ACTIVITY_DETAILS_DATA } from './client-activity-details-helper';
import { ClientActivityDetailsComponentService } from './client-activity-details.component.service';
import { IComplaintFormData } from '@platform/shared/components/modals/call-modals/call-summary/components/complaint-form/complaint-form.component';
import {
  CallSummaryStateEnum,
  ICallSummaryRateData,
} from '@platform/shared/components/modals/call-modals/call-summary/components/call-summary/call-summary.component';

export interface IClientActivityData {
  activityId: string;
  isImportant: boolean;
}

enum ClientActivityModalSteps {
  SUE_DETAILS,
  CHAT_HISTORY,
  REPORT_COMPLAINT,
  RATE_CONSULTATION,
}

@Component({
  selector: 'plat-client-details',
  templateUrl: './client-activity-details.component.html',
  styleUrls: ['./client-activity-details.component.sass'],
  providers: [ClientActivityDetailsComponentService],
})
export class ClientActivityDetailsComponent extends Logger implements OnInit {
  public activityType: ActivityTypeEnum;
  public sueDetails: ISueDetails;
  public modalHeaderTrKey: string;
  public groupedMessages: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>> = [];
  public isChatHistoryVisible = false;
  public expertAvatarUrl: string;
  public isBackwardVisible = false;
  public isCompanyActivity?: boolean;
  public userAvatarUrl?: string;
  public currentModalStep: number;
  public isComplaint = false;
  public complaint?: GetClientComplaint;
  public isRequestPending = false;
  public currentSummaryState = CallSummaryStateEnum.SUMMARY_DETAILS;
  public sueId: string;
  public isRateOptionVisible = false;

  private readonly modalHeaderTrKeys = {
    default: 'ACTIVITY_DETAILS.MODAL_HEADER.DEFAULT',
    chatHistory: 'ACTIVITY_DETAILS.MODAL_HEADER.CHAT_HISTORY',
    reportComplaint: 'ACTIVITY_DETAILS.MODAL_HEADER.REPORT_COMPLAINT',
    rateConsultation: 'ACTIVITY_DETAILS.MODAL_HEADER.RATE_CONSULTATION',
    technicalProblems: 'ACTIVITY_DETAILS.MODAL_HEADER.TECHNICAL_PROBLEMS',
  };
  private readonly initialModalHeight = '100px';

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private clientActivityDetailsService: ClientActivityDetailsComponentService,
    private activeModal: NgbActiveModal,
    @Inject(CLIENT_ACTIVITY_DETAILS_DATA) private activityData: IClientActivityData,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ClientActivityDetailsComponent'));
    this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
  }

  public ngOnInit(): void {
    this.fetchActivityDetails();
    this.currentModalStep = ClientActivityModalSteps.SUE_DETAILS;
  }

  public onOpenChat(): void {
    this.assignModalData(ClientActivityModalSteps.CHAT_HISTORY, this.modalHeaderTrKeys.chatHistory, true);
  }

  public onBackwardClick(): void {
    this.assignModalData(ClientActivityModalSteps.SUE_DETAILS, this.modalHeaderTrKeys.default, false);
  }

  public onReportComplaintClick(): void {
    this.assignModalData(ClientActivityModalSteps.REPORT_COMPLAINT, this.modalHeaderTrKeys.reportComplaint, true);
  }

  public onRateConsultationClick(): void {
    this.assignModalData(ClientActivityModalSteps.RATE_CONSULTATION, this.modalHeaderTrKeys.rateConsultation, true);
  }

  public onSubmitComplaint(complaintData: IComplaintFormData): void {
    this.isRequestPending = true;
    this.clientActivityDetailsService
      .reportComplaint(this.sueDetails.sueId, {
        message: complaintData.comment,
        complaintType: complaintData.selectedComplaint,
      })
      .pipe(
        finalize(() => {
          this.isRequestPending = false;
        }),
      )
      .subscribe(() => {
        this.assignComplaintValue(complaintData);
        this.onBackwardClick();
      });
  }

  public onRateSubmit(data: ICallSummaryRateData): void {
    /**
     * for properties: commentId, expertId, clientId we assign empty string
     * because we dont have this data here and we just want to "mock" this GetComment model
     * to display it on UI without request to backend
     */
    this.sueDetails = {
      ...this.sueDetails,
      rate: data.rate,
      comment: {
        commentId: '',
        content: data.commentMessage,
        expertId: '',
        sueId: this.sueDetails.sueId,
        callDurationInSeconds: this.sueDetails.callDuration,
        clientDetails: {
          clientId: '',
        },
        createdAt: new Date(),
      },
    };
  }

  public onRecommendTags(tags: ReadonlyArray<string>): void {
    this.sueDetails = { ...this.sueDetails, recommendedTags: tags.join(', ') };
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public onCallSummaryStateChange(state: CallSummaryStateEnum): void {
    switch (state) {
      case CallSummaryStateEnum.POSITIVE_COMMENT:
        this.setModalValues(this.modalHeaderTrKeys.rateConsultation, false, CallSummaryStateEnum.POSITIVE_COMMENT);
        break;
      case CallSummaryStateEnum.COMMENT:
        this.setModalValues(this.modalHeaderTrKeys.rateConsultation, true, CallSummaryStateEnum.COMMENT);
        break;
      case CallSummaryStateEnum.TECHNICAL_PROBLEM:
        this.setModalValues(this.modalHeaderTrKeys.technicalProblems, true, CallSummaryStateEnum.TECHNICAL_PROBLEM);
        break;
      case CallSummaryStateEnum.COMPLAIN:
        this.setModalValues(this.modalHeaderTrKeys.reportComplaint, true, CallSummaryStateEnum.COMPLAIN);
        break;
      case CallSummaryStateEnum.TAGS:
        this.setModalValues(this.modalHeaderTrKeys.rateConsultation, true, CallSummaryStateEnum.TAGS);
        break;
      case CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT:
        this.setModalValues(
          this.modalHeaderTrKeys.rateConsultation,
          true,
          CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT,
        );
        break;
      case CallSummaryStateEnum.SUMMARY_DETAILS:
        this.setModalValues(this.modalHeaderTrKeys.rateConsultation, true, CallSummaryStateEnum.SUMMARY_DETAILS);
        break;
      default:
        this.loggerService.error('unhandled call summary state:', state);
    }
  }

  public assignComplaintValue(complaintData: IComplaintFormData): void {
    this.complaint = {
      /**
       * for properties: id, expertId, clientId we assign empty string
       * because we dont have this data here and we just want to "mock" this GetClientComplaint model
       * to display it on UI without request to backend
       */
      id: '',
      expertId: '',
      clientId: '',
      sueId: this.sueDetails.sueId,
      message: complaintData.comment,
      complaintType: complaintData.selectedComplaint,
      status: GetClientComplaint.StatusEnum.NEW,
    };
    this.isComplaint = true;
  }

  private setModalValues(headerTrKey: string, isBackwardVisible: boolean, state: CallSummaryStateEnum): void {
    this.modalHeaderTrKey = headerTrKey;
    this.isBackwardVisible = isBackwardVisible;
    this.currentSummaryState = state;

    switch (state) {
      case CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT:
        this.onBackwardClick = (): void =>
          this.setModalValues(this.modalHeaderTrKeys.rateConsultation, true, CallSummaryStateEnum.TECHNICAL_PROBLEM);
        break;
      case CallSummaryStateEnum.SUMMARY_DETAILS:
        this.onBackwardClick = (): void => {
          this.currentModalStep = ClientActivityModalSteps.SUE_DETAILS;
          this.modalHeaderTrKey = this.modalHeaderTrKeys.default;
          this.isBackwardVisible = false;
        };
        break;
      default:
        this.onBackwardClick = (): void =>
          this.setModalValues(this.modalHeaderTrKeys.rateConsultation, true, CallSummaryStateEnum.SUMMARY_DETAILS);
    }
  }

  private fetchActivityDetails(): void {
    this.clientActivityDetailsService
      .getActivityDetails(this.activityData.activityId, this.activityData.isImportant)
      .pipe(
        catchError(() => {
          this.activeModal.close(MODAL_CLOSED_WITH_ERROR);

          return EMPTY;
        }),
      )
      .subscribe(response => {
        this.sueDetails = response.activityDetails;
        this.sueId = response.activityDetails.sueId;
        this.isRateOptionVisible = typeof response.activityDetails.rate === 'undefined';
        this.isChatHistoryVisible = response.chatHistory.length > 0;
        this.groupedMessages = response.chatHistory;
        this.userAvatarUrl = response.activityDetails.clientAvatarUrl;
        this.expertAvatarUrl = response.activityDetails.expertAvatarUrl;
        this.modalAnimationComponentService.stopLoadingAnimation(this.initialModalHeight);
        if (typeof response.activityDetails.complaint !== 'undefined') {
          this.isComplaint = true;
          this.complaint = response.activityDetails.complaint;
        }
      });
  }

  private assignModalData(modalStep: ClientActivityModalSteps, headerTrKey: string, isBackwardVisible: boolean): void {
    this.currentModalStep = modalStep;
    this.modalHeaderTrKey = headerTrKey;
    this.isBackwardVisible = isBackwardVisible;
  }
}
