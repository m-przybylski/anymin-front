import { Component, Input } from '@angular/core';
import { GetComment } from '@anymind-ng/api';
import { AvatarSizeEnum } from '../../../../../user-avatar/user-avatar.component';

@Component({
  selector: 'plat-consultation-comment-answer',
  templateUrl: './consultation-comment-answer.component.html',
  styleUrls: ['./consultation-comment-answer.component.sass'],
})
export class ConsultationCommentAnswerComponent {
  @Input()
  public avatarSize: AvatarSizeEnum;

  @Input()
  public commentDetails: GetComment;

  @Input()
  public expertName: string;

  @Input()
  public tokentAvatar: string;
}
