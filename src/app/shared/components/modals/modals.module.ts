import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
import { CreateExpertConsultationModalComponent } from './create-expert-consultation/create-expert-consultation.component';
import { CreateCompanyConsultationModalComponent } from './create-company-consultation/create-company-consultation.component';
import { InputsModule } from '../inputs/inputs.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { InvitationsModalsModule } from './invitations/invitations.module';
import { ModalComponentsModule } from './modal/modal.components.module';

@NgModule({
  declarations: [PinElementDirective, CreateExpertConsultationModalComponent, CreateCompanyConsultationModalComponent],
  entryComponents: [CreateExpertConsultationModalComponent, CreateCompanyConsultationModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    InputsModule,
    UserAvatarModule,
    ReactiveFormsModule,
    InvitationsModalsModule,
    ModalComponentsModule,
  ],
  exports: [SharedModule, FormsModule, ReactiveFormsModule, PinElementDirective, ModalComponentsModule],
})
export class ModalsModule {}
