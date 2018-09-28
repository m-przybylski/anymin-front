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
import { ConsultationFooterComponent } from './consultation-footer/consultation-footer.component';
import { ConsultationFooterWrapperComponent } from './consultation-footer-wrapper/consultation-footer-wrapper.component';
import { PaymentCardModule } from '@platform/shared/components/pipes/payment-card';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    UserAvatarModule,
    ModalComponentsModule,
    PaymentCardModule,
  ],
  declarations: [
    ConsultationDetailsViewComponent,
    ConsultationCommentComponent,
    ConsultationCommentItemComponent,
    ConsultationCommentAnswerComponent,
    TimeDurationPipe,
    DateDurationPipe,
    ConsultationDetailsComponent,
    ConsultationFooterComponent,
    ConsultationFooterWrapperComponent,
  ],
  exports: [ConsultationDetailsComponent, ConsultationFooterComponent, ConsultationFooterWrapperComponent],
  entryComponents: [ConsultationDetailsViewComponent],
})
export class ConsultationDetailsModule {}
