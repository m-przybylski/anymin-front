import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneNumberViewComponent } from './views/phone-number/phone-number.view.component';
import { PasswordViewComponent } from './views/password/password.view.component';
import { PinCodeViewComponent } from './views/pin-code/pin-code.view.component';
import { PinCodeViewResolver } from './views/pin-code/pin-code.view.resolver';
import { LimitedAccessViewComponent } from './views/limited-access/limited-access.view.component';
import { MsisdnGuard } from '../../shared/guards/msisdn/msisdn.guard';
import { BlockedViewComponent } from './views/blocked/blocked.view.component';

const routes: Routes = [
  {
    path: '',
    component: PhoneNumberViewComponent,
    pathMatch: 'full',
  },
  {
    path: 'pin-code/:msisdn',
    canActivate: [MsisdnGuard],
    resolve: { registrationSession: PinCodeViewResolver },
    component: PinCodeViewComponent,
  },
  {
    path: 'password/:msisdn',
    canActivate: [MsisdnGuard],
    component: PasswordViewComponent,
  },
  {
    path: 'limited-access',
    component: LimitedAccessViewComponent,
  },
  {
    path: 'blocked',
    component: BlockedViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
