import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmailViewComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/change-email/change-email.view.component';
import { ManageSessionsViewComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/manage-sessions/manage-sessions.view.component';
import { MsisdnSettingsViewComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/msisdn-settings/msisdn-settings.view.component';
import { PasswordSettingsViewComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/password-settings/password-settings.view.component';
import { ChangePasswordComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/password-settings/change-password/change-password.component';
import { EmailConfirmationComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/password-settings/email-confirmation/email-confirmation.component';
import { SetNewPasswordComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/password-settings/set-new-password/set-new-password.component';
import { PinVerificationComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/pin-verification/pin-verification.component';
import { SettingOptionComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/setting-option/setting-option.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { ChangeMsisdnComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/msisdn-settings/change-msisdn/change-msisdn.component';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    ModalsModule,
    InputsModule
  ],
  exports: [
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    MsisdnSettingsViewComponent,
    PasswordSettingsViewComponent,
    ChangePasswordComponent,
    EmailConfirmationComponent,
    SetNewPasswordComponent,
    PinVerificationComponent,
    SettingOptionComponent,
    ChangeMsisdnComponent
  ],
  declarations: [
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    MsisdnSettingsViewComponent,
    PasswordSettingsViewComponent,
    ChangePasswordComponent,
    EmailConfirmationComponent,
    SetNewPasswordComponent,
    PinVerificationComponent,
    SettingOptionComponent,
    ChangeMsisdnComponent
  ],
  providers: [],
  entryComponents: [
    MsisdnSettingsViewComponent,
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    PasswordSettingsViewComponent

  ]
})

export class SettingsComponentsModule {}
