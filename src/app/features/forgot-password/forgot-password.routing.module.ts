import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetNewPasswordFromEmailViewComponent } from './views/set-new-password-from-email/set-new-password-from-email.view.component';
import { EmailViewComponent } from './views/email/email.view.component';
import { ForgotPasswordPinCodeViewComponent } from './views/pin-code/pin-code.view.component';
import { SetNewPasswordFromMsisdnViewComponent } from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.component';
import { SetNewPasswordFromMsisdnViewGuard } from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.guard';
import { MsisdnGuard } from './msisdn.guard';
import { SetNewPasswordFromEmailViewResolver } from './views/set-new-password-from-email/set-new-password-from-email.view.resolver';
import { ForgotPasswordViewComponent } from './views/forgot-password/forgot-password.view.component';
import { ForgotPasswordWidgetInformationViewComponent } from './views/widget-information/widget-information.view.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordViewComponent,
    pathMatch: 'full',
  },
  {
    path: 'pin-code/:msisdn',
    component: ForgotPasswordPinCodeViewComponent,
    canActivate: [MsisdnGuard],
  },
  {
    path: 'email',
    component: EmailViewComponent,
  },
  {
    path: 'widget-information',
    component: ForgotPasswordWidgetInformationViewComponent,
  },
  {
    path: 'email/set-new-password/:token',
    component: SetNewPasswordFromEmailViewComponent,
    resolve: {
      login: SetNewPasswordFromEmailViewResolver,
    },
  },
  {
    path: 'set-new-password/:msisdn',
    component: SetNewPasswordFromMsisdnViewComponent,
    canActivate: [MsisdnGuard, SetNewPasswordFromMsisdnViewGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
