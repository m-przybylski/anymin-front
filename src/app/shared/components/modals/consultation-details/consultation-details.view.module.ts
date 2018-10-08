import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/date-duration.pipe';
import { ConsultationCommentItemComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/consultation-comment-item.component';
import { ConsultationCommentComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment.component';
import { TimeDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/time-duration.pipe';
import { ConsultationCommentAnswerComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/consultation-comment-answer/consultation-comment-answer.component';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { SharedModule } from '@platform/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { ModalComponentsModule } from '../modal/modal.components.module';
import { PaymentCardModule } from '@platform/shared/components/pipes/payment-card';
import { ConsultationFooterModule } from './consultation-footers/consultation-footer.module';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { ConfirmationModalModule } from '../confirmation/confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    UserAvatarModule,
    ModalComponentsModule,
    PaymentCardModule,
    ConsultationFooterModule,
    ConfirmationModalModule,
  ],
  declarations: [
    ConsultationDetailsViewComponent,
    ConsultationCommentComponent,
    ConsultationCommentItemComponent,
    ConsultationCommentAnswerComponent,
    TimeDurationPipe,
    DateDurationPipe,
    ConsultationDetailsComponent,
  ],
  exports: [ConsultationDetailsComponent],
  entryComponents: [ConsultationDetailsViewComponent],
})
export class ConsultationDetailsModule {}
