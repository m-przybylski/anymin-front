import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetEmailViewResolver } from './views/set-email/set-email.view.resolver';
import { SetPasswordViewResolver } from './views/set-password/set-password.view.resolver';
import { SetPasswordViewComponent } from './views/set-password/set-password.view.component';
import { SetEmailViewComponent } from './views/set-email/set-email.view.component';
import { SetEmailViewGuard } from './views/set-email/set-email.view.guard';
import { SetPasswordViewGuard } from './views/set-password/set-password.view.guard';
import { MsisdnGuard } from '../../shared/guards/msisdn/msisdn.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full' },
  {
    path: 'set-password/:msisdn',
    canActivate: [SetPasswordViewGuard, MsisdnGuard],
    component: SetPasswordViewComponent,
    resolve: {
      accountId: SetPasswordViewResolver
    }
  },
  {
    path: 'set-email',
    canActivate: [SetEmailViewGuard],
    component: SetEmailViewComponent,
    resolve: {
      accountId: SetEmailViewResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule {
}
