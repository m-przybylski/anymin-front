import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService, CurrentClientCall, CurrentExpertCall, LoggerFactory } from '@anymind-ng/core';
import { ModalAnimationComponentService } from '../../modal/animation/modal-animation.animation.service';
import { CallSummaryService } from './call-summary.service';
import { Logger } from '@platform/core/logger';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { ModalContainerTypeEnum } from '@platform/shared/components/modals/modal/modal.component';
import { ClientCallSummary, ExpertCallSummary, MoneyDto, PostTechnicalProblem } from '@anymind-ng/api';
import { FormGroup } from '@angular/forms';
import { Config } from '../../../../../../config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

enum SummaryStateEnum {
  SUMMARY_DETAILS,
  COMMENT,
  TECHNICAL_PROBLEM,
  TECHNICAL_PROBLEM_COMMENT,
}

@Component({
  selector: 'plat-call-summary',
  templateUrl: './call-summary.component.html',
  styleUrls: ['./call-summary.component.sass'],
  providers: [CallSummaryService],
})
export class CreateCallSummaryComponent extends Logger implements OnInit, OnDestroy {
  public currentExpertCall: CurrentExpertCall;
  public currentClientCall: CurrentClientCall;

  public readonly avatarSize = AvatarSizeEnum.X_80;
  public readonly modalContainerClass = ModalContainerTypeEnum.SMALL_NO_PADDING;
  public readonly postTechnicalProblemEnum = PostTechnicalProblem.ProblemTypeEnum;
  public readonly summaryStateEnum = SummaryStateEnum;
  public readonly minValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMinLength;
  public readonly maxValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMaxLength;
  public readonly commentControlName = 'comment';
  public readonly formId = 'commentFormId';
  public readonly technicalProblemControlName = 'technicalProblem';

  public isCommentInputDisabled = false;
  public currentSummaryState = SummaryStateEnum.SUMMARY_DETAILS;
  public avatarToken?: string;
  public name: string;
  public title: string;
  public callDuration: number;
  public isClientCall: boolean;
  public callCost?: MoneyDto;
  public callProfit: MoneyDto;
  public modalHeaderTr = 'CALL_SUMMARY.HEADER.TITLE';
  public onBackwardClick: () => void;
  public isBackwardVisible = false;
  public commentForm: FormGroup;
  public technicalProblemForm: FormGroup;
  public isClientReported = false;
  public isTechnicalProblemReported = false;
  public isTechnicalProblemInputDisabled = false;
  public onSubmitComment: () => void;

  private sueId: string;
  private ngUnsubscribe = new Subject<string>();

  constructor(
    private modalAnimationComponentService: ModalAnimationComponentService,
    private callSummaryService: CallSummaryService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('CreateCallSummaryComponent'));
  }

  public ngOnInit(): void {
    this.commentForm = new FormGroup({});
    this.technicalProblemForm = new FormGroup({});
    this.modalAnimationComponentService.isPendingRequest().next(false);
    this.fetchCallSummary();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public switchToReportClient = (): void => {
    this.currentSummaryState = SummaryStateEnum.COMMENT;
    this.modalHeaderTr = 'CALL_SUMMARY.HEADER.REPORT_CLIENT';
    this.isBackwardVisible = true;
    this.onBackwardClick = this.backToCallDetails;
    this.onSubmitComment = this.submitReportClientForm;
  };

  public switchToTechnicalProblem = (): void => {
    this.currentSummaryState = SummaryStateEnum.TECHNICAL_PROBLEM;
    this.modalHeaderTr = 'CALL_SUMMARY.HEADER.TECHNICAL_PROBLEM';
    this.isBackwardVisible = true;
    this.onBackwardClick = this.backToCallDetails;
  };

  public onSubmitTechnicalProblem = (): void => {
    const technicalProblemSelectedValue = this.technicalProblemForm.controls[this.technicalProblemControlName].value;
    if (
      typeof technicalProblemSelectedValue !== 'undefined' &&
      technicalProblemSelectedValue !== this.postTechnicalProblemEnum.OTHER
    ) {
      this.isTechnicalProblemInputDisabled = true;
      this.callSummaryService.reportTechnicalProblem(this.sueId, technicalProblemSelectedValue).subscribe(
        () => {
          this.backToCallDetails();
          this.isTechnicalProblemReported = true;
          this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_SUCCESSFULLY');
          this.isTechnicalProblemInputDisabled = false;
        },
        error => {
          this.loggerService.warn(`Can not send technical problem: ${error}`);
          this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_FAILED');
          this.isTechnicalProblemInputDisabled = false;
        },
      );
    } else {
      this.goToTechnicalProblemSecondStep();
    }
  };

  public technicalProblemButtonTr = (): string =>
    this.technicalProblemForm.controls[this.technicalProblemControlName].value === this.postTechnicalProblemEnum.OTHER
      ? 'CALL_SUMMARY.TECHNICAL_PROBLEM_BUTTON_NEXT'
      : 'CALL_SUMMARY.TECHNICAL_PROBLEM_BUTTON_SEND';

  private submitReportClientForm = (): void => {
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
          error => {
            this.loggerService.warn(`Can not send report: ${error}`);
            this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_CLIENT_REPORTED_FAILED');
            this.isCommentInputDisabled = false;
          },
        );
    }
  };

  private submitTechnicalProblemComment = (): void => {
    this.isCommentInputDisabled = true;
    this.callSummaryService.reportTechnicalProblem(this.sueId, PostTechnicalProblem.ProblemTypeEnum.OTHER).subscribe(
      () => {
        this.backToCallDetails();
        this.isTechnicalProblemReported = true;
        this.alertService.pushSuccessAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_SUCCESSFULLY');
        this.isCommentInputDisabled = false;
      },
      error => {
        this.loggerService.warn(`Can not send technical problem: ${error}`);
        this.alertService.pushDangerAlert('CALL_SUMMARY.ALERT_TECHNICAL_PROBLEM_REPORTED_FAILED');
        this.isCommentInputDisabled = false;
      },
    );
  };

  private goToTechnicalProblemSecondStep = (): void => {
    this.currentSummaryState = SummaryStateEnum.TECHNICAL_PROBLEM_COMMENT;
    this.isBackwardVisible = true;
    this.onBackwardClick = this.backToTechnicalProblem;
    this.onSubmitComment = this.submitTechnicalProblemComment;
  };

  private backToCallDetails = (): void => {
    this.currentSummaryState = SummaryStateEnum.SUMMARY_DETAILS;
    this.modalHeaderTr = 'CALL_SUMMARY.HEADER.TITLE';
    this.isBackwardVisible = false;
  };

  private backToTechnicalProblem = (): void => {
    this.currentSummaryState = SummaryStateEnum.TECHNICAL_PROBLEM;
    this.onBackwardClick = this.backToCallDetails;
  };

  private fetchCallSummary = (): void => {
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
  };

  private setClientData = (summary: ClientCallSummary): void => {
    this.avatarToken = summary.expertProfile.expertDetails ? summary.expertProfile.expertDetails.avatar : '';
    this.name = summary.expertProfile.expertDetails ? summary.expertProfile.expertDetails.name : '';
    this.title = summary.service.name;
    this.callDuration = summary.callDuration;
    this.callCost = summary.promoCodeCost || summary.creditCardCost || { value: 0, currency: 'PLN' };
    this.sueId = summary.sueId;
    this.modalAnimationComponentService.isPendingRequest().next(false);
    this.isClientCall = true;
  };

  private setExpertData = (summary: ExpertCallSummary): void => {
    this.avatarToken = summary.clientDetails.avatar;
    this.name = summary.clientDetails.nickname ? summary.clientDetails.nickname : 'CALL_SUMMARY.ANONYMOUS_CLIENT';
    this.title = summary.service.name;
    this.callDuration = summary.callDuration;
    this.callProfit = summary.profit;
    this.sueId = summary.sueId;
    this.modalAnimationComponentService.isPendingRequest().next(false);
  };
}
