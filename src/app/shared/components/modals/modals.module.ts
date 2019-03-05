import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { CreateEditConsultationModalComponent } from './create-edit-consultation/create-edit-consultation.component';
import { InputsModule } from '../inputs/inputs.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { InvitationsModalsModule } from './invitations/invitations.module';
import { ModalComponentsModule } from './modal/modal.components.module';
import { CallModalsModule } from '@platform/shared/components/modals/call-modals/call-modals.module';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { ConfirmationModalModule } from '@platform/shared/components/modals/confirmation/confirmation.module';
import { TooltipModule } from '@platform/shared/components/tooltip/tooltip.module';
import { VerifiedEmailModule } from '@platform/shared/components/modals/verfied-email/verified-email.module';

@NgModule({
  declarations: [CreateEditConsultationModalComponent],
  entryComponents: [CreateEditConsultationModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InputsModule,
    UserAvatarModule,
    ReactiveFormsModule,
    InvitationsModalsModule,
    ModalComponentsModule,
    CallModalsModule,
    ButtonModule,
    ConfirmationModalModule,
    VerifiedEmailModule,
    TooltipModule,
  ],
  exports: [SharedModule, FormsModule, ReactiveFormsModule, ModalComponentsModule],
})
export class ModalsModule {}
