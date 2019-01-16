import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EmailViewComponent } from './views/email/email.view.component';
import { ForgotPasswordPinCodeViewComponent } from './views/pin-code/pin-code.view.component';
import { SetNewPasswordFromEmailViewComponent } from './views/set-new-password-from-email/set-new-password-from-email.view.component';
import { SetNewPasswordFromMsisdnViewComponent } from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.component';
import { SetNewPasswordFromMsisdnViewGuard } from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.guard';
import { SetNewPasswordFromEmailViewResolver } from './views/set-new-password-from-email/set-new-password-from-email.view.resolver';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { ForgotPasswordViewComponent } from '@platform/features/forgot-password/views/forgot-password/forgot-password.view.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { IconModule } from '@platform/shared/components/atomic-components';
import { LoginComponentsModule } from '@platform/shared/components/login/login-components.module';
import { ForgotPasswordWidgetInformationViewComponent } from './views/widget-information/widget-information.view.component';
import { MsisdnGuard } from './msisdn.guard';

@NgModule({
  declarations: [
    SetNewPasswordFromEmailViewComponent,
    SetNewPasswordFromMsisdnViewComponent,
    ForgotPasswordPinCodeViewComponent,
    ForgotPasswordViewComponent,
    ForgotPasswordWidgetInformationViewComponent,
    EmailViewComponent,
  ],
  providers: [SetNewPasswordFromMsisdnViewGuard, MsisdnGuard, SetNewPasswordFromEmailViewResolver],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    InputsModule,
    AnymindComponentsModule,
    IconModule,
    LoginComponentsModule,
  ],
})
export class ForgotPasswordModule {}
