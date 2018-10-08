import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './modal/confirmation-modal.component';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponentsModule } from '../modal/modal.components.module';

@NgModule({
  imports: [ModalComponentsModule, ButtonModule, CommonModule, TranslateModule.forChild()],
  declarations: [ConfirmationModalComponent],
  entryComponents: [ConfirmationModalComponent],
  providers: [ConfirmationService],
})
export class ConfirmationModalModule {}
