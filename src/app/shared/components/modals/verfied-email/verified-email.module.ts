import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { VerifiedEmailComponent } from '@platform/shared/components/modals/verfied-email/verified-email.component';
import { NgModule } from '@angular/core';
import { VerifiedEmailService } from '@platform/shared/components/modals/verfied-email/verified-email.service';

@NgModule({
  imports: [ModalComponentsModule, ButtonModule, CommonModule, TranslateModule.forChild()],
  declarations: [VerifiedEmailComponent],
  entryComponents: [VerifiedEmailComponent],
  providers: [VerifiedEmailService],
})
export class VerifiedEmailModule {}
