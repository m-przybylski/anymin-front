import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
import { CreateEditConsultationModalComponent } from './create-edit-consultation/create-edit-consultation.component';
import { InputsModule } from '../inputs/inputs.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { InvitationsModalsModule } from './invitations/invitations.module';
import { ModalComponentsModule } from './modal/modal.components.module';
import { CallModalsModule } from '@platform/shared/components/modals/call-modals/call-modals.module';

@NgModule({
  declarations: [PinElementDirective, CreateEditConsultationModalComponent],
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
  ],
  exports: [SharedModule, FormsModule, ReactiveFormsModule, PinElementDirective, ModalComponentsModule],
})
export class ModalsModule {}
