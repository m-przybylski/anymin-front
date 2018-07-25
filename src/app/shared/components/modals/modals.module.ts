// tslint:disable:no-empty
// tslint:disable:max-line-length
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { PinElementDirective } from '../../directives/pin-element/pin-element.directive';
import { ChangeNumberComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/change-number/change-number/change-number.component';
import { ModalComponent } from './modal/modal.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { ModalAnimationComponentDirective } from './modal/animation/modal-animation.component.directive';
import { ModalAnimationComponentService } from './modal/animation/modal-animation.animation.service';
import { CreateExpertConsultationModalComponent }
from './create-expert-consultation/create-expert-consultation.component';
import { CreateCompanyConsultationModalComponent }
from './create-company-consultation/create-company-consultation.component';
import { ChangePasswordComponent }
from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/change-password/change-password.component';
import { PasswordSettingsViewComponent }
from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/password-settings.view.component';
import { PinVerificationComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/pin-verification/pin-verification.component';
import { SetNewPasswordComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/set-new-password/set-new-password.component';
import { EmailConfirmationComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/email-confirmation/email-confirmation.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective,
    ModalAnimationComponentDirective,
    ChangeNumberComponent,
    ChangePasswordComponent,
    PinVerificationComponent,
    SetNewPasswordComponent,
    EmailConfirmationComponent,
    PasswordSettingsViewComponent,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent
  ],
  entryComponents: [
    ChangeNumberComponent,
    ChangePasswordComponent,
    PinVerificationComponent,
    SetNewPasswordComponent,
    EmailConfirmationComponent,
    PasswordSettingsViewComponent,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent
  ],
  providers: [ModalAnimationComponentService],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective
  ]
})
export class ModalsModule {

  constructor() {
  }
}
