import { Component, Input } from '@angular/core';
import { AvatarSizeEnum } from '../../user-avatar/user-avatar.component';
import { Animations } from '../../../animations/animations';
import { GetComment, GetReport } from '@anymind-ng/api';
import { AnimationEvent } from '@angular/animations';

export enum ConsultationCommentTypeAnswer {
  ANSWER,
  REASON_REPORT,
}

@Component({
  selector: 'plat-consultation-comments-item',
  templateUrl: './consultation-comment-item.component.html',
  styleUrls: ['./consultation-comment-item.component.sass'],
  animations: [Animations.dropdownAnimation, Animations.collapse],
})
export class ConsultationCommentItemComponent {
  @Input()
  public isSueExpert = false;

  @Input()
  public toggleAnswerField: (answerType: ConsultationCommentTypeAnswer) => void;

  @Input()
  public set commentDetails(value: GetComment | undefined) {
    if (typeof value !== 'undefined') {
      this.comment = value;
      this.isAnswer = typeof value.answer !== 'undefined';
      this.commentDate = value.createdAt;

      if (typeof value.report !== 'undefined') {
        this.isReported = true;
        this.isReportAccepted = value.report.status === GetReport.StatusEnum.ACCEPTED;
      }
    }
  }

  @Input()
  public expertName = '';

  @Input()
  public tokenAvatar = '';

  @Input()
  public isReported = false;

  @Input()
  public temporaryAnswer = false;

  public readonly avatarSize40: AvatarSizeEnum = AvatarSizeEnum.X_40;
  public isAnswer = false;
  public comment: GetComment;
  public dropdownNavigationList = ConsultationCommentTypeAnswer;
  public commentDate: Date;
  public isReportAccepted = false;
  public dropdownVisibility: 'hidden' | 'visible' = 'hidden';

  public isCommentOptionVisible = (): boolean =>
    this.isSueExpert && (!this.isReported || (!this.isAnswer && !this.temporaryAnswer));

  public toggleDropdown = (isVisible: boolean): void => {
    isVisible ? (this.dropdownVisibility = 'visible') : (this.dropdownVisibility = 'hidden');
  };

  public onDropdownChoose = (type: ConsultationCommentTypeAnswer): void => {
    switch (type) {
      case ConsultationCommentTypeAnswer.REASON_REPORT:
        this.toggleAnswerField(ConsultationCommentTypeAnswer.REASON_REPORT);
        break;

      case ConsultationCommentTypeAnswer.ANSWER:
        this.toggleAnswerField(ConsultationCommentTypeAnswer.ANSWER);
        break;

      default:
        return;
    }
  };

  public onAnimationStart = (event: AnimationEvent, el: HTMLUListElement): void => {
    if (event.fromState === 'void' && event.toState === 'hidden') {
      el.style.visibility = 'hidden';

      return;
    }

    if (event.toState === 'visible') {
      el.style.visibility = 'visible';

      return;
    }
  };

  public onAnimationDone = (event: AnimationEvent, el: HTMLUListElement): void => {
    if (event.toState === 'hidden') {
      el.style.visibility = 'hidden';
    }
  };
}
