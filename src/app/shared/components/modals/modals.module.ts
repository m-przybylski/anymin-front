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
import { CreateExpertConsultationModalComponent } from './create-expert-consultation/create-expert-consultation.component';
import { CreateCompanyConsultationModalComponent } from './create-company-consultation/create-company-consultation.component';
import { ChangePasswordComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/change-password/change-password.component';
import { PasswordSettingsViewComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/password-settings.view.component';
import { PinVerificationComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/pin-verification/pin-verification.component';
import { SetNewPasswordComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/set-new-password/set-new-password.component';
import { EmailConfirmationComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/password-settings/email-confirmation/email-confirmation.component';
import { EmployeesInviteModalComponent } from './employees-invite/employees-invite.component';
import { ChangeEmailViewComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/change-email/change-email.view.component';
import { CsvUploaderComponent } from './employees-invite/csv-uploader/csv-uploader.component';
import { CsvUploaderDirective } from './employees-invite/csv-uploader/csv-uploader.directive';
import { ManageSessionsViewComponent } from '../../../features/dashboard/views/user-dashboard/settings/components/manage-sessions/manage-sessions.view.component';
import { InputsModule } from '../inputs/inputs.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';

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
    ManageSessionsViewComponent,
    PasswordSettingsViewComponent,
    ChangeEmailViewComponent,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent,
    EmployeesInviteModalComponent,
    CsvUploaderComponent,
    CsvUploaderDirective,
  ],
  entryComponents: [
    ChangeNumberComponent,
    ChangePasswordComponent,
    PinVerificationComponent,
    SetNewPasswordComponent,
    EmailConfirmationComponent,
    PasswordSettingsViewComponent,
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    CreateExpertConsultationModalComponent,
    CreateCompanyConsultationModalComponent,
    EmployeesInviteModalComponent,
  ],
  providers: [ModalAnimationComponentService],
  imports: [CommonModule, SharedModule, FormsModule, InputsModule, UserAvatarModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    PinElementDirective,
    CsvUploaderComponent,
    CsvUploaderDirective,
  ],
})
export class ModalsModule {
  constructor() {}
}
