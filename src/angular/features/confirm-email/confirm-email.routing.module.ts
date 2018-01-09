import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmEmailComponent} from './confirm-email.component';
import {ConfirmEmailGuard} from './confirm-email.guard';

const routes: Routes = [
  {
    path: 'token/:token',
    data: {
      title: 'PAGE_TITLE.LOGIN.CONFIRM_EMAIL'
    },
    component: ConfirmEmailComponent,
    canActivate: [ConfirmEmailGuard]
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
export class ConfirmEmailRoutingModule {
}
