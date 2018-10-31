import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationCommentComponent } from './consultation-comment.component';
import { ConsultationCommentItemComponent } from './consultation-comment-item/consultation-comment-item.component';
import { ConsultationCommentAnswerComponent } from './consultation-comment-item/consultation-comment-answer/consultation-comment-answer.component';
import { TimeDurationPipe } from './consultation-comment-item/time-duration.pipe';
import { DateDurationPipe } from './consultation-comment-item/date-duration.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { DropdownModule } from '@platform/shared/components/dropdown/dropdown.module';
import { CommentDropdownPositionDirective } from './consultation-comment-item/comment-dropdown-position.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnymindComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
    UserAvatarModule,
    DropdownModule,
  ],
  entryComponents: [ConsultationCommentComponent],
  declarations: [
    ConsultationCommentComponent,
    ConsultationCommentItemComponent,
    ConsultationCommentAnswerComponent,
    TimeDurationPipe,
    DateDurationPipe,
    CommentDropdownPositionDirective,
  ],
  exports: [ConsultationCommentComponent],
})
export class ConsultationCommentModule {}
