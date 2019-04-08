import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationModalComponent } from '@platform/shared/components/modals/login/registration-modal/registration-modal.component';
import { ModalComponentsModule } from '@platform/shared/components/modals/modal/modal.components.module';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { LoginComponentsModule } from '@platform/shared/components/login/login-components.module';

@NgModule({
  declarations: [RegistrationModalComponent],
  entryComponents: [RegistrationModalComponent],
  imports: [CommonModule, ModalComponentsModule, StepperModule, LoginComponentsModule],
})
export class RegistrationModalModule {}
