import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertCompanyActivityDetailsComponent } from '@platform/shared/components/modals/activity-details/expert-company-details/expert-company-activity-details.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { SueDetailsComponent } from './components/sue-details/sue-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { FinancialOperationDetailsComponent } from './components/financial-operation-details/financial-operation-details.component';
import { UuidTrimmerPipe } from '@platform/shared/components/modals/activity-details/uuid-trimmer.pipe';
import { ConsultationCommentModule } from '@platform/shared/components/consultation-comment/consultation-comment.module';
import { RefundDetailsComponent } from './components/refund-details/refund-details.component';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';
import { ClientActivityDetailsComponent } from './client-details/client-activity-details.component';
import { ActivityDetailsService } from './activity-details.service';
import { ComplaintDetailsComponent } from './components/complaint-details/complaint-details.component';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { ReactiveFormsModule } from '@angular/forms';
import { CallModalsModule } from '@platform/shared/components/modals/call-modals/call-modals.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponentsModule,
    TranslateModule,
    AnymindComponentsModule,
    StepperModule,
    ConsultationCommentModule,
    MoneyDisplayModule,
    ButtonModule,
    IconModule,
    CallModalsModule,
  ],
  entryComponents: [ExpertCompanyActivityDetailsComponent, ClientActivityDetailsComponent],
  declarations: [
    ExpertCompanyActivityDetailsComponent,
    SueDetailsComponent,
    ChatHistoryComponent,
    FinancialOperationDetailsComponent,
    UuidTrimmerPipe,
    RefundDetailsComponent,
    ClientActivityDetailsComponent,
    ComplaintDetailsComponent,
  ],
  providers: [ActivityDetailsService],
})
export class ActivityDetailsModule {}
