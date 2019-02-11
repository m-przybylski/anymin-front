// tslint:disable:max-file-line-count
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { AlertService, CurrentClientCall, CurrentExpertCall } from '@anymind-ng/core';
import {
  ClientCallSummary,
  ExpertCallSummary,
  GetCallDetails,
  GetTag,
  MoneyDto,
  PostTechnicalProblem,
} from '@anymind-ng/api';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { CallSummaryService } from './call-summary.service';
import { IComplaintFormData } from '@platform/shared/components/modals/call-modals/call-summary/components/complaint-form/complaint-form.component';
import { takeUntil } from 'rxjs/operators';
import { Config } from 'src/config';

export enum CallSummaryStateEnum {
  SUMMARY_DETAILS,
  COMMENT,
  POSITIVE_COMMENT,
  TECHNICAL_PROBLEM,
  TECHNICAL_PROBLEM_COMMENT,
  COMPLAIN,
  TAGS,
}

export interface ICallSummaryRateData {
  rate: GetCallDetails.RateEnum;
  commentMessage: string;
}

@Component({
  selector: 'plat-call-summary',
  templateUrl: './call-summary.component.html',
  styleUrls: ['./call-summary.component.sass'],
  providers: [CallSummaryService],
})
export class CallSummaryComponent implements OnInit {
  @Input()
  public currentExpertCall: CurrentExpertCall;

  @Input()
  public currentClientCall: CurrentClientCall;

  @Input()
  public sueIdFromClientActivity?: string;

  @Input()
  public isClientComplained = false;

  @Input()
  public set currentSummaryState(value: CallSummaryStateEnum) {
    this._currentSummaryState = value;
    switch (value) {
      case CallSummaryStateEnum.COMMENT:
      case CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT:
      case CallSummaryStateEnum.POSITIVE_COMMENT:
        this.clearCommentInput();

        return;

      default:
        return;
    }
  }

  public get currentSummaryState(): CallSummaryStateEnum {
    return this._currentSummaryState;
  }

  @Output()
  public stateChange = new EventEmitter<CallSummaryStateEnum>();

  @Output()
  public complaintSubmit = new EventEmitter<IComplaintFormData>();

  @Output()
  public rateSubmit = new EventEmitter<ICallSummaryRateData>();

  @Output()
  public recommendedTags = new EventEmitter<ReadonlyArray<string>>();

  public readonly avatarSize = AvatarSizeEnum.X_80;
  public readonly modalContainerClass = ModalContainerTypeEnum.SMALL_NO_PADDING;
  public readonly summaryStateEnum: typeof CallSummaryStateEnum = CallSummaryStateEnum;
  public readonly minValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMinLength;
  public readonly maxValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMaxLength;
  public readonly commentControlName = 'comment';
  public readonly formId = 'commentFormId';

  public avatarToken?: string;
  public name: string;
  public title: string;
  public callDuration: number;
  public callCost?: MoneyDto;
  public callProfit: MoneyDto;
  public onBackwardClick: () => void;
  public commentForm: FormGroup;
  public onSubmitComment: () => void;
  public tagList: ReadonlyArray<GetTag>;
  public isClientReported = false;
  public isNegativeScore = false;
  public isPositiveScore = false;
  public isTechnicalProblemReported = false;
  public isClientRated = false;
  public isTechnicalProblemInputDisabled = false;
  public isComplaintInputDisabled = false;
  public isBackwardVisible = false;
  public isClientCall = false;
  public isCommentInputDisabled = false;
  public isRecommendable = false;

  private sueId: string;
  private ngUnsubscribe = new Subject<string>();
  private _currentSummaryState: CallSummaryStateEnum;

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private callSummaryService: CallSummaryService,
    private alertService: AlertService,
  ) {}

  public ngOnInit(): void {
    this.commentForm = new FormGroup({});
    this.modalAnimationComponentService.isPendingRequest().next(false);
    this.fetchCallSummary();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSwitchToReportClient(): void {
    this.stateChange.emit(CallSummaryStateEnum.COMMENT);
    this.onSubmitComment = this.submitReportClientForm;
  }

  public onSwitchToTechnicalProblem(): void {
    this.stateChange.emit(CallSummaryStateEnum.TECHNICAL_PROBLEM);
  }

  public onSwitchToComplain(): void {
    this.stateChange.emit(CallSummaryStateEnum.COMPLAIN);
  }

  public onSwitchToTags(): void {
    this.stateChange.emit(CallSummaryStateEnum.TAGS);
  }

  public onSwitchToNegativeRatingComment(): void {
    this.stateChange.emit(CallSummaryStateEnum.COMMENT);
    this.onSubmitComment = this.submitRateNegativeExpertForm;
    this.isNegativeScore = true;
  }

  public onSubmitTechnicalProblem(technicalProblemSelectedValue: PostTechnicalProblem.ProblemTypeEnum): void {
    if (technicalProblemSelectedValue !== PostTechnicalProblem.ProblemTypeEnum.OTHER) {
      this.isTechnicalProblemInputDisabled = true;
      this.callSummaryService.reportTechnicalProblem(this.sueId, technicalProblemSelectedValue).subscribe(
        () => {
          this.backToCallDetails();
          this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_SUCCESSFULLY');
          this.isTechnicalProblemInputDisabled = false;
          this.isTechnicalProblemReported = true;
        },
        _ => {
          this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_FAILED');
          this.isTechnicalProblemInputDisabled = false;
        },
      );
    } else {
      this.goToTechnicalProblemSecondStep();
    }
  }

  public onSubmitComplainForm(complaintFormData: IComplaintFormData): void {
    this.isComplaintInputDisabled = true;
    this.callSummaryService
      .clientReportComplaint(this.sueId, complaintFormData.selectedComplaint, complaintFormData.comment || '')
      .subscribe(
        () => {
          this.backToCallDetails();
          this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_COMPLAINT_REPORTED_SUCCESSFULLY');
          this.isComplaintInputDisabled = false;
          this.isClientComplained = true;
          this.complaintSubmit.emit(complaintFormData);
        },
        _ => {
          this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_COMPLAINT_REPORTED_FAILED');
          this.isComplaintInputDisabled = false;
        },
      );
  }

  public onTagsSaved(selectedTags: ReadonlyArray<GetTag>): void {
    this.callSummaryService.rateExpertPositiveWithTags(this.sueId, selectedTags.map(tag => tag.id)).subscribe(
      () => {
        this.stateChange.emit(CallSummaryStateEnum.POSITIVE_COMMENT);
        this.onSubmitComment = this.submitPositiveCommentRateExpertForm;
        this.isPositiveScore = true;
        this.isClientRated = true;
        this.recommendedTags.emit(selectedTags.map(tag => tag.name));
      },
      _ => {
        this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_POSITIVE_RATED_FAILED');
      },
    );
  }

  public backToCallDetails(): void {
    this.stateChange.emit(CallSummaryStateEnum.SUMMARY_DETAILS);
    this.isNegativeScore = false;
    this.isPositiveScore = false;
  }

  private submitReportClientForm(): void {
    if (this.commentForm.valid) {
      this.isCommentInputDisabled = true;
      this.callSummaryService
        .reportClient(this.sueId, this.commentForm.controls[this.commentControlName].value)
        .subscribe(
          () => {
            this.backToCallDetails();
            this.clearCommentInput();
            this.isClientReported = true;
            this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_SEND_CLIENT_REPORT_SUCCESSFULLY');
            this.isCommentInputDisabled = false;
          },
          _ => {
            this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_CLIENT_REPORTED_FAILED');
            this.isCommentInputDisabled = false;
          },
        );
    }
  }

  private submitTechnicalProblemComment(): void {
    this.isCommentInputDisabled = true;
    this.callSummaryService.reportTechnicalProblem(this.sueId, PostTechnicalProblem.ProblemTypeEnum.OTHER).subscribe(
      () => {
        this.backToCallDetails();
        this.clearCommentInput();
        this.isTechnicalProblemReported = true;
        this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_SUCCESSFULLY');
        this.isCommentInputDisabled = false;
      },
      _ => {
        this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_FAILED');
        this.isCommentInputDisabled = false;
      },
    );
  }

  private submitRateNegativeExpertForm(): void {
    this.isCommentInputDisabled = true;
    const comment = this.commentForm.controls[this.commentControlName].value;
    this.callSummaryService.rateExpertNegative(this.sueId, comment).subscribe(
      () => {
        this.backToCallDetails();
        this.clearCommentInput();
        this.isClientRated = true;
        this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_RATED_NEGATIVE_SUCCESSFULLY');
        this.isCommentInputDisabled = false;
        this.rateSubmit.emit({
          rate: GetCallDetails.RateEnum.NEGATIVE,
          commentMessage: comment,
        });
      },
      _ => {
        this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_RATED_NEGATIVE_FAILED');
        this.isCommentInputDisabled = false;
      },
    );
  }

  private submitPositiveCommentRateExpertForm(): void {
    if (this.commentForm.valid) {
      this.isCommentInputDisabled = true;
      const comment = this.commentForm.controls[this.commentControlName].value;
      this.callSummaryService.commentExpert(this.sueId, comment).subscribe(
        () => {
          this.backToCallDetails();
          this.clearCommentInput();
          this.isClientRated = true;
          this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_RATED_POSITIVE_SUCCESSFULLY');
          this.isCommentInputDisabled = false;
          this.rateSubmit.emit({
            rate: GetCallDetails.RateEnum.POSITIVE,
            commentMessage: comment,
          });
        },
        _ => {
          this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_RATED_POSITIVE_FAILED');
          this.isCommentInputDisabled = false;
        },
      );
    }
  }

  private goToTechnicalProblemSecondStep(): void {
    this.stateChange.emit(CallSummaryStateEnum.TECHNICAL_PROBLEM_COMMENT);
    this.onSubmitComment = this.submitTechnicalProblemComment;
  }

  private fetchCallSummary(): void {
    if (this.sueIdFromClientActivity) {
      this.callSummaryService
        .getClientCallSummaryBySueId(this.sueIdFromClientActivity)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(summary => {
          this.setClientData(summary);
        });
    } else if (this.currentExpertCall) {
      this.callSummaryService
        .getExpertCallSummary(this.currentExpertCall)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(summary => {
          this.setExpertData(summary);
        });
    } else {
      this.callSummaryService
        .getClientCallSummary(this.currentClientCall)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(summary => {
          this.setClientData(summary);
        });
    }
  }

  private setClientData(summary: ClientCallSummary): void {
    this.avatarToken = summary.expertProfile.avatar;
    this.name = summary.expertProfile.name;
    this.title = summary.service.name;
    this.callDuration = summary.callDuration;
    this.callCost = summary.promoCodeCost || summary.creditCardCost || { value: 0, currency: 'PLN' };
    this.sueId = summary.sueId;
    this.modalAnimationComponentService.isPendingRequest().next(false);
    this.isClientCall = true;
    this.tagList = summary.serviceTags;
    this.isRecommendable = summary.isRecommendable;
    this.isTechnicalProblemReported = typeof summary.technicalProblem !== 'undefined';
  }

  private setExpertData(summary: ExpertCallSummary): void {
    this.avatarToken = summary.clientDetails.avatar;
    this.name = summary.clientDetails.nickname ? summary.clientDetails.nickname : 'CALL_SUMMARY.ANONYMOUS_CLIENT';
    this.title = summary.service.name;
    this.callDuration = summary.callDuration;
    this.callProfit = summary.profit;
    this.sueId = summary.sueId;
    this.modalAnimationComponentService.isPendingRequest().next(false);
  }

  private clearCommentInput(): void {
    if (this.commentForm.controls[this.commentControlName]) {
      this.commentForm.controls[this.commentControlName].reset('');
    }
  }
}
