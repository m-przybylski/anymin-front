import { Component, Input, OnInit } from '@angular/core';
import { AvatarSizeEnum } from '@platform/shared/components/user-avatar/user-avatar.component';
import { Animations } from '../../../../../animations/animations';
import { GetComment, GetReport } from '@anymind-ng/api';

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
export class ConsultationCommentItemComponent implements OnInit {
  @Input()
  public isOwner = false;

  @Input()
  public toggleAnswerField: (answerType: ConsultationCommentTypeAnswer) => void;

  @Input()
  public commentDetails: GetComment;

  @Input()
  public expertName: string;

  @Input()
  public tokentAvatar: string;

  @Input()
  public isReported = false;

  @Input()
  public temporaryAnswer = false;

  public readonly avatarSize40: AvatarSizeEnum = AvatarSizeEnum.X_40;
  public isAnswer = false;
  public isDropdownVisible = false;
  public dropdownNavigationList = ConsultationCommentTypeAnswer;
  public commentDate: Date;
  public isReportAccepted = false;

  public ngOnInit(): void {
    this.isAnswer = typeof this.commentDetails.answer !== 'undefined';
    this.isReported = typeof this.commentDetails.report !== 'undefined';
    this.commentDate = this.commentDetails.createdAt;

    if (typeof this.commentDetails.report !== 'undefined') {
      this.isReportAccepted = this.commentDetails.report.status === GetReport.StatusEnum.ACCEPTED;
    }
  }

  public toggleDropdown = (isVisible: boolean): void => {
    this.isDropdownVisible = isVisible;
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
}
