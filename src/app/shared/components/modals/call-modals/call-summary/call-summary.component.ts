// tslint:disable:max-file-line-count
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, CurrentClientCall, CurrentExpertCall } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { CallSummaryService } from './call-summary.service';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ClientCallSummary, ExpertCallSummary, GetTag, MoneyDto, PostTechnicalProblem } from '@anymind-ng/api';
import { FormGroup } from '@angular/forms';
import { Config } from '../../../../../../config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IComplaintFormData } from '@platform/shared/components/modals/call-modals/call-summary/components/complaint-form/complaint-form.component';

enum SummaryStateEnum {
  SUMMARY_DETAILS,
  COMMENT,
  TECHNICAL_PROBLEM,
  TECHNICAL_PROBLEM_COMMENT,
  COMPLAIN,
  TAGS,
}

@Component({
  selector: 'plat-call-summary',
  templateUrl: './call-summary.component.html',
  styleUrls: ['./call-summary.component.sass'],
  providers: [CallSummaryService],
})
export class CreateCallSummaryComponent implements OnInit, OnDestroy {
  public readonly avatarSize = AvatarSizeEnum.X_80;
  public readonly modalContainerClass = ModalContainerTypeEnum.SMALL_NO_PADDING;
  public readonly summaryStateEnum = SummaryStateEnum;
  public readonly minValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMinLength;
  public readonly maxValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMaxLength;
  public readonly commentControlName = 'comment';
  public readonly formId = 'commentFormId';

  public currentExpertCall: CurrentExpertCall;
  public currentClientCall: CurrentClientCall;
  public currentSummaryState = SummaryStateEnum.SUMMARY_DETAILS;
  public avatarToken?: string;
  public name: string;
  public title: string;
  public callDuration: number;
  public callCost?: MoneyDto;
  public callProfit: MoneyDto;
  public modalHeaderTr = 'CALL_SUMMARY.HEADER.TITLE';
  public onBackwardClick: () => void;
  public commentForm: FormGroup;
  public onSubmitComment: () => void;
  public tagList: ReadonlyArray<GetTag>;
  public isClientReported = false;
  public isNegativeScore = false;
  public isPositiveScore = false;
  public isTechnicalProblemReported = false;
  public isClientRated = false;
  public isClientComplained = false;
  public isTechnicalProblemInputDisabled = false;
  public isComplaintInputDisabled = false;
  public isBackwardVisible = false;
  public isClientCall = false;
  public isCommentInputDisabled = false;
  public isRecommendable = false;

  private sueId: string;
  private ngUnsubscribe = new Subject<string>();

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

  public switchToReportClient(): void {
    this.switchCallSummaryState(
      SummaryStateEnum.COMMENT,
      'CALL_SUMMARY.HEADER.REPORT_CLIENT',
      true,
      this.backToCallDetails,
    );
    this.onSubmitComment = this.submitReportClientForm;
  }

  public switchToTechnicalProblem(): void {
    this.switchCallSummaryState(
      SummaryStateEnum.TECHNICAL_PROBLEM,
      'CALL_SUMMARY.HEADER.TECHNICAL_PROBLEM',
      true,
      this.backToCallDetails,
    );
  }

  public switchToComplain(): void {
    this.switchCallSummaryState(
      SummaryStateEnum.COMPLAIN,
      'CALL_SUMMARY.HEADER.COMPLAIN',
      true,
      this.backToCallDetails,
    );
  }

  public switchToTags(): void {
    this.switchCallSummaryState(SummaryStateEnum.TAGS, 'CALL_SUMMARY.HEADER.TAGS', true, this.backToCallDetails);
  }

  public switchToNegativeRatingComment(): void {
    this.switchCallSummaryState(
      SummaryStateEnum.COMMENT,
      'CALL_SUMMARY.HEADER.NEGATIVE_COMMENT',
      true,
      this.backToCallDetails,
    );
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
        },
        _ => {
          this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_COMPLAINT_REPORTED_FAILED');
          this.isComplaintInputDisabled = false;
        },
      );
  }

  public onTagsSaved(selectedTags: ReadonlyArray<string>): void {
    this.callSummaryService.rateExpertPositiveWithTags(this.sueId, selectedTags).subscribe(
      () => {
        this.currentSummaryState = SummaryStateEnum.COMMENT;
        this.modalHeaderTr = 'CALL_SUMMARY.HEADER.POSITIVE_COMMENT';
        this.isBackwardVisible = false;
        this.onSubmitComment = this.submitPositiveCommentRateExpertForm;
        this.isPositiveScore = true;
        this.isClientRated = true;
      },
      _ => {
        this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_POSITIVE_RATED_FAILED');
      },
    );
  }

  public backToCallDetails(): void {
    this.currentSummaryState = SummaryStateEnum.SUMMARY_DETAILS;
    this.modalHeaderTr = 'CALL_SUMMARY.HEADER.TITLE';
    this.isBackwardVisible = false;
    this.isNegativeScore = false;
    this.isPositiveScore = false;
  }

  private switchCallSummaryState(
    state: SummaryStateEnum,
    modalHeaderTr: string,
    isBackwardVisible: boolean,
    onBackwardClick: () => void,
  ): void {
    this.currentSummaryState = state;
    this.modalHeaderTr = modalHeaderTr;
    this.isBackwardVisible = isBackwardVisible;
    this.onBackwardClick = onBackwardClick;
  }

  private submitReportClientForm(): void {
    if (this.commentForm.valid) {
      this.isCommentInputDisabled = true;
      this.callSummaryService
        .reportClient(this.sueId, this.commentForm.controls[this.commentControlName].value)
        .subscribe(
          () => {
            this.backToCallDetails();
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
        this.isClientRated = true;
        this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_RATED_NEGATIVE_SUCCESSFULLY');
        this.isCommentInputDisabled = false;
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
          this.isClientRated = true;
          this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_RATED_POSITIVE_SUCCESSFULLY');
          this.isCommentInputDisabled = false;
        },
        _ => {
          this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_RATED_POSITIVE_FAILED');
          this.isCommentInputDisabled = false;
        },
      );
    }
  }

  private goToTechnicalProblemSecondStep(): void {
    this.switchCallSummaryState(
      SummaryStateEnum.TECHNICAL_PROBLEM_COMMENT,
      'CALL_SUMMARY.HEADER.TECHNICAL_PROBLEM',
      true,
      this.backToTechnicalProblem,
    );
    this.onSubmitComment = this.submitTechnicalProblemComment;
  }

  private backToTechnicalProblem(): void {
    this.currentSummaryState = SummaryStateEnum.TECHNICAL_PROBLEM;
    this.onBackwardClick = this.backToCallDetails;
  }

  private fetchCallSummary(): void {
    if (this.currentExpertCall) {
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
    this.avatarToken = summary.expertProfile.expertDetails ? summary.expertProfile.expertDetails.avatar : '';
    this.name = summary.expertProfile.expertDetails ? summary.expertProfile.expertDetails.name : '';
    this.title = summary.service.name;
    this.callDuration = summary.callDuration;
    this.callCost = summary.promoCodeCost || summary.creditCardCost || { value: 0, currency: 'PLN' };
    this.sueId = summary.sueId;
    this.modalAnimationComponentService.isPendingRequest().next(false);
    this.isClientCall = true;
    this.tagList = summary.serviceTags;
    this.isRecommendable = summary.isRecommendable;
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
}
