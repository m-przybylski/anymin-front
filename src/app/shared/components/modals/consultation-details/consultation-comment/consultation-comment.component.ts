import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Config } from '../../../../../../config';
import { Animations } from '../../../../animations/animations';
import { GetComment } from '@anymind-ng/api/model/getComment';
import { GetAnswer, GetReport } from '@anymind-ng/api';
import { ConsultationCommentService } from './consultation-comment.service';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultationCommentTypeAnswer } from './consultation-comment-item/consultation-comment-item.component';
import { Logger } from '@platform/core/logger';

@Component({
  selector: 'plat-consultation-comments',
  templateUrl: './consultation-comment.component.html',
  styleUrls: ['./consultation-comment.component.sass'],
  providers: [ConsultationCommentService],
  animations: Animations.collapse,
})
export class ConsultationCommentComponent extends Logger implements OnInit {
  public static readonly timeout = 300;
  public readonly reasonList: ReadonlyArray<GetReport.CauseEnum> = [
    'FALSE_COMMENT',
    'OFFENSIVE_COMMENT',
    'SPAM_COMMENT',
  ];
  public readonly answerFormGroup: FormGroup = new FormGroup({});
  public readonly answerFormControlName = 'answerControlName';
  public readonly commentMaxLength = Config.inputsLengthNumbers.commentMaxLength;
  public readonly commentMinLength = Config.inputsLengthNumbers.commentMinLength;

  public isAnswerFieldVisible = false;
  public isReasonFieldVisible = false;

  @Input()
  public isOwner = false;

  @Input()
  public expertName: string;

  @Input()
  public expertAvatar: string;

  @Input()
  public commentDetails: GetComment;

  @Output()
  public onAddAnswer = new EventEmitter<GetComment>();

  public tmpAnswer = false;

  public commentAnswer: GetAnswer;
  public isReported = false;
  private sueId: string;

  constructor(
    private consultationCommentService: ConsultationCommentService,
    private alertService: AlertService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationCommentComponent'));
  }

  public ngOnInit(): void {
    this.answerFormGroup.addControl(this.answerFormControlName, new FormControl('', []));
    this.sueId = this.commentDetails.sueId;

    if (typeof this.commentDetails.answer !== 'undefined') {
      this.commentAnswer = this.commentDetails.answer;
    }
  }

  public dropdownChoose = (choose: ConsultationCommentTypeAnswer): void => {
    switch (choose) {
      case ConsultationCommentTypeAnswer.ANSWER:
        this.isReasonFieldVisible
          ? this.setReasonFieldAnimationDelay()
          : (this.isAnswerFieldVisible = !this.isAnswerFieldVisible);
        break;

      case ConsultationCommentTypeAnswer.REASON_REPORT:
        this.isAnswerFieldVisible
          ? this.setAnswerFieldAnimationDelay()
          : (this.isReasonFieldVisible = !this.isReasonFieldVisible);
        break;

      default:
        return;
    }
  };

  public closeAnswerFields = (): void => {
    this.isAnswerFieldVisible = false;
    this.isReasonFieldVisible = false;
  };

  public onSendComment = (formGrup: FormGroup): void => {
    if (formGrup.valid) {
      this.isReported = true;
      this.sendCommentAnswer(formGrup.controls[this.answerFormControlName].value);
      this.closeAnswerFields();
    }
  };

  public sendReasonReport = (reason: GetReport.CauseEnum): void => {
    this.consultationCommentService
      .postCommentReport(this.sueId, this.commentDetails.commentId, reason)
      .pipe(
        catchError(err => this.handleRequestError(err, 'Can not send comment report')),
        tap(() => {
          this.closeAnswerFields();
          this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.COMMENTS.REPORT.COMPLETE');
        }),
      )
      .subscribe();
  };

  private sendCommentAnswer = (answer: string): void => {
    this.commentDetails.answer = {
      content: answer,
      createdAt: new Date(),
    };

    this.consultationCommentService
      .postCommentAnswer(this.sueId, this.commentDetails.commentId, answer)
      .pipe(
        tap(() => {
          this.onAddAnswer.emit(this.commentDetails);
          this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.COMMENTS.ANSWER.COMPLETE');
        }),
        switchMap(() => timer(ConsultationCommentComponent.timeout)),
        tap(() => (this.tmpAnswer = true)),
        catchError(err => this.handleRequestError(err, 'Can not send comment answer')),
      )
      .subscribe();
  };

  private handleRequestError = (error: HttpErrorResponse, msg: string): Observable<void> => {
    this.loggerService.warn(msg, error);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return EMPTY;
  };

  private setAnswerFieldAnimationDelay = (): void => {
    this.isAnswerFieldVisible = false;

    setTimeout(() => {
      this.isReasonFieldVisible = !this.isReasonFieldVisible;
    }, ConsultationCommentComponent.timeout);
  };

  private setReasonFieldAnimationDelay = (): void => {
    this.isReasonFieldVisible = false;
    setTimeout(() => {
      this.isAnswerFieldVisible = !this.isAnswerFieldVisible;
    }, ConsultationCommentComponent.timeout);
  };
}
