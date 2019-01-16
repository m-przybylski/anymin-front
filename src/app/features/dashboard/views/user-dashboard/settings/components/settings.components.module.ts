import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeEmailViewComponent } from './change-email/change-email.view.component';
import { ManageSessionsViewComponent } from './manage-sessions/manage-sessions.view.component';
import { MsisdnSettingsViewComponent } from './msisdn-settings/msisdn-settings.view.component';
import { ChangePasswordViewComponent } from './change-password/change-password.view.component';
import { PinVerificationComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/pin-verification/pin-verification.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { ChangeMsisdnComponent } from './msisdn-settings/change-msisdn/change-msisdn.component';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { ChangeAnonymityComponent } from './change-anonymity/change-anonymity.component';
import { DropdownModule } from '@platform/shared/components/dropdown/dropdown.module';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { ChangeNotificationComponent } from './change-notifications/change-notifications.component';

@NgModule({
  imports: [CommonModule, ModalsModule, InputsModule, DropdownModule, ButtonModule],
  exports: [
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    MsisdnSettingsViewComponent,
    ChangePasswordViewComponent,
    PinVerificationComponent,
    ChangeMsisdnComponent,
    ChangeAnonymityComponent,
    ChangeNotificationComponent,
  ],
  declarations: [
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    MsisdnSettingsViewComponent,
    ChangePasswordViewComponent,
    PinVerificationComponent,
    ChangeMsisdnComponent,
    ChangeAnonymityComponent,
    ChangeNotificationComponent,
  ],
  providers: [],
  entryComponents: [
    MsisdnSettingsViewComponent,
    ChangeEmailViewComponent,
    ManageSessionsViewComponent,
    ChangePasswordViewComponent,
  ],
})
export class SettingsComponentsModule {}
