import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ConsultationCommentModule } from '@platform/shared/components/consultation-comment/consultation-comment.module';
import { DropdownModule } from '@platform/shared/components/dropdown/dropdown.module';
import { ConsultationFootersService } from './consultation-footers.service';
import { ConsultationDetailsViewService } from './consultation-details.view.service';

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
    ExpertAvailabilityModule,
    GenerateWidgetModule,
    ConsultationCommentModule,
    DropdownModule,
  ],
  declarations: [
    ConsultationDetailsViewComponent
  ],
  providers: [
    ConsultationDetailsActionsService,
    ConsultationFootersService,
    ConsultationDetailsViewService
  ],
  entryComponents: [ConsultationDetailsViewComponent],
})
export class ConsultationDetailsModule {}
