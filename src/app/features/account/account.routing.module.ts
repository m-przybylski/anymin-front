import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPasswordViewComponent } from './views/set-password/set-password.view.component';
import { SetEmailViewComponent } from './views/set-email/set-email.view.component';
import { SetEmailViewGuard } from './views/set-email/set-email.view.guard';
import { SetPasswordViewGuard } from './views/set-password/set-password.view.guard';
import { AccountIdResolver } from './views/account.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full' },
  {
    path: 'set-password',
    canActivate: [SetPasswordViewGuard],
    component: SetPasswordViewComponent,
    resolve: {
      accountId: AccountIdResolver,
    },
  },
  {
    path: 'set-email',
    canActivate: [SetEmailViewGuard],
    component: SetEmailViewComponent,
    resolve: {
      accountId: AccountIdResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
