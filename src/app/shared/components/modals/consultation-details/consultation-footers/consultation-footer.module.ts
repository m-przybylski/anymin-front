import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule, ButtonModule } from '@platform/shared/components/atomic-components';
import { ConsultationFooterComponent } from './consultation-footer/consultation-footer.component';
import { ConsultationFooterComponentsModule } from './components';
import { ConsultationFooterUserComponent } from './consultation-footer-user/consultation-footer-user.component';
import { ConsultationFooterEditComponent } from './consultation-footer-edit/consultation-footer-edit.component';
import { ConsultationFooterMultipleExpertComponent } from './consultation-footer-multiple-expert/consultation-footer-multiple-expert.component';
import { ConsultationFooterLeaveComponent } from './consultation-footer-leave/consultation-footer-leave.component';
import { PaymentCardModule } from '@platform/shared/components/pipes/payment-card';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    ButtonModule,
    TranslateModule.forChild(),
    ConsultationFooterComponentsModule,
    PaymentCardModule,
  ],
  exports: [ConsultationFooterComponent],
  entryComponents: [
    ConsultationFooterLeaveComponent,
    ConsultationFooterEditComponent,
    ConsultationFooterMultipleExpertComponent,
    ConsultationFooterUserComponent,
  ],
  declarations: [
    ConsultationFooterLeaveComponent,
    ConsultationFooterEditComponent,
    ConsultationFooterMultipleExpertComponent,
    ConsultationFooterUserComponent,
    ConsultationFooterComponent,
  ],
})
export class ConsultationFooterModule {}
