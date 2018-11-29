import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailsViewComponent } from '@platform/shared/components/modals/activity-details/activity-details.view.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { SueDetailsComponent } from './sue-details/sue-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { FinancialOperationDetailsComponent } from './financial-operation-details/financial-operation-details.component';
import { UuidTrimmerPipe } from '@platform/shared/components/modals/activity-details/uuid-trimmer.pipe';
import { ConsultationCommentModule } from '@platform/shared/components/consultation-comment/consultation-comment.module';
import { RefundDetailsComponent } from './refund-details/refund-details.component';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';

@NgModule({
  imports: [
    CommonModule,
    ModalComponentsModule,
    TranslateModule,
    AnymindComponentsModule,
    StepperModule,
    ConsultationCommentModule,
    MoneyDisplayModule,
  ],
  entryComponents: [ActivityDetailsViewComponent],
  declarations: [
    ActivityDetailsViewComponent,
    SueDetailsComponent,
    ChatHistoryComponent,
    FinancialOperationDetailsComponent,
    UuidTrimmerPipe,
    RefundDetailsComponent,
  ],
})
export class ActivityDetailsModule {}
