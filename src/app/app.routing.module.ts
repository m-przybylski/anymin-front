import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsupportedGuard } from './shared/guards/unsupported/unsupported.guard';
import { SessionGuard } from './shared/guards/session/session.guard';
import { AnonymousGuard } from './shared/guards/anonymous/anonymous.guard';

const appRoutes: Routes = [
  {path: '', canActivate: [UnsupportedGuard], children: [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'confirm-email', loadChildren: './features/confirm-email/confirm-email.module#ConfirmEmailModule'},
    {path: 'login', canActivate: [AnonymousGuard], loadChildren: './features/login/login.module#LoginModule'},
    {
      canActivate: [AnonymousGuard],
      path: 'forgot-password',
      loadChildren: './features/forgot-password/forgot-password.module#ForgotPasswordModule',
    },
    {path: 'account', canActivate: [SessionGuard], loadChildren: './features/account/account.module#AccountModule'},
    {path: 'dupa', canActivate: [SessionGuard],
      loadChildren: './features/dashboard/dashboard.module#DashboardModule'},
    // required by AngularJS
    {path: 'dashboard/expert/activities', loadChildren: './features/angularjs/angularjs.module#AngularJsModule'},
  ]},
  {path: 'unsupported', loadChildren: './features/unsupported/unsupported.module#UnsupportedModule'},
  {path: '**', loadChildren: './features/angularjs/angularjs.module#AngularJsModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
