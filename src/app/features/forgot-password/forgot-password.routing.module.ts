import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetNewPasswordFromEmailViewComponent } from './views/set-new-password-from-email/set-new-password-from-email.view.component';
import { EmailViewComponent } from './views/email/email.view.component';
import { ForgotPasswordPinCodeViewComponent } from './views/pin-code/pin-code.view.component';
import { ForgotPasswordGuard } from './forgot-password.guard';
import { SetNewPasswordFromMsisdnViewComponent } from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.component';
import { SetNewPasswordFromMsisdnViewGuard } from './views/set-new-password-from-msisdn/set-new-password-from-msisdn.view.guard';
import { SetNewPasswordFromEmailViewGuard } from './views/set-new-password-from-email/set-new-password-from-email.view.guard';
import { MsisdnGuard } from '../../shared/guards/msisdn/msisdn.guard';
import { SetNewPasswordFromEmailViewResolver } from './views/set-new-password-from-email/set-new-password-from-email.view.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: ':msisdn',
    pathMatch: 'full',
    canActivate: [MsisdnGuard, ForgotPasswordGuard],
  },
  {
    path: 'pin-code/:msisdn',
    component: ForgotPasswordPinCodeViewComponent,
    canActivate: [MsisdnGuard],
  },
  {
    path: 'email/:msisdn',
    component: EmailViewComponent,
    canActivate: [MsisdnGuard],
  },
  {
    path: 'email/set-new-password/:token',
    component: SetNewPasswordFromEmailViewComponent,
    canActivate: [SetNewPasswordFromEmailViewGuard],
    resolve: {
      msisdn: SetNewPasswordFromEmailViewResolver,
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
