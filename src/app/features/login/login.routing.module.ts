import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login/login.view.component';
import { BlockedViewComponent } from './views/blocked/blocked.view.component';

const routes: Routes = [
  {
    path: '',
    component: LoginViewComponent,
    pathMatch: 'full',
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
