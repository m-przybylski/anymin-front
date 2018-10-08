import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/date-duration.pipe';
import { ConsultationCommentItemComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/consultation-comment-item.component';
import { ConsultationCommentComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment.component';
import { TimeDurationPipe } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/time-duration.pipe';
import { ConsultationCommentAnswerComponent } from '@platform/shared/components/modals/consultation-details/consultation-comment/consultation-comment-item/consultation-comment-answer/consultation-comment-answer.component';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { SharedModule } from '@platform/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/consultation-details.view.component';
import { ModalComponentsModule } from '../modal/modal.components.module';
import { ConsultationDetailsComponentModule } from '@platform/features/dashboard/components/consultation-details/consultation-details.component.module';
import { PaymentCardModule } from '@platform/shared/components/pipes/payment-card';
import { ConsultationFooterModule } from './consultation-footers/consultation-footer.module';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { ConfirmationModalModule } from '../confirmation/confirmation.module';
import { GenerateWidgetModule } from '@platform/shared/components/modals/generate-widget/generate-widget.module';
import { ConsultationDetailsActionsService } from '@platform/shared/components/modals/consultation-details/consultation-details-actions.service';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    ModalComponentsModule,
    ConsultationDetailsComponentModule,
    PaymentCardModule,
    ConsultationFooterModule,
    ConfirmationModalModule,
    ExpertAvailabilityModule.forRoot(),
    GenerateWidgetModule,
  ],
  declarations: [
    ConsultationDetailsViewComponent,
    ConsultationCommentComponent,
    ConsultationCommentItemComponent,
    ConsultationCommentAnswerComponent,
    TimeDurationPipe,
    DateDurationPipe,
  ],
  providers: [ConsultationDetailsActionsService],
  entryComponents: [ConsultationDetailsViewComponent],
})
export class ConsultationDetailsModule {}
