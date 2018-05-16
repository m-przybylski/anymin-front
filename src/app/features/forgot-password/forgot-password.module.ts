import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EmailViewComponent } from './views/email/email.view.component';
import { ForgotPasswordPinCodeViewComponent } from './views/pin-code/pin-code.view.component';
import { ForgotPasswordGuard } from './forgot-password.guard';
import { VerifiedCodeService } from './verified-code.service';
import {
  SetNewPasswordFromEmailViewComponent
} from './views/set-new-password-from-email/set-new-password-from-email.view.component';
import {
  SetNewPasswordFromMsisdnViewComponent
} from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.component';
import {
  SetNewPasswordFromMsisdnViewGuard
} from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.guard';
import {
  SetNewPasswordFromEmailViewGuard
} from './views/set-new-password-from-email/set-new-password-from-email.view.guard';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';

@NgModule({
  declarations: [
    SetNewPasswordFromEmailViewComponent,
    SetNewPasswordFromMsisdnViewComponent,
    ForgotPasswordPinCodeViewComponent,
    EmailViewComponent
  ],
  providers: [
    ForgotPasswordGuard,
    VerifiedCodeService,
    SetNewPasswordFromMsisdnViewGuard,
    SetNewPasswordFromEmailViewGuard
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    AngularJsProvidersModule
  ]
})
export class ForgotPasswordModule {

  constructor() {
  }
}
