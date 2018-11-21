import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsupportedGuard } from './features/unsupported/unsupported.guard';
import { SessionGuard } from './shared/guards/session/session.guard';
import { AnonymousGuard } from './shared/guards/anonymous/anonymous.guard';
import { ConfirmEmailComponent } from './features/confirm-email/confirm-email.component';
import { ConfirmEmailGuard } from './features/confirm-email/confirm-email.guard';
import { RouterPaths, RouterPathsToken } from './shared/routes/routes';
import { ProfileGuard } from './shared/guards/profile/profile.guard';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [UnsupportedGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'confirm-email/token/:token', canActivate: [ConfirmEmailGuard], component: ConfirmEmailComponent },
      { path: 'login', canActivate: [AnonymousGuard], loadChildren: './features/login/login.module#LoginModule' },
      {
        canActivate: [AnonymousGuard],
        path: 'forgot-password',
        loadChildren: './features/forgot-password/forgot-password.module#ForgotPasswordModule',
      },
      { path: 'account', canActivate: [SessionGuard], loadChildren: './features/account/account.module#AccountModule' },
      // required by AngularJS
      { path: 'dashboard/expert/activities', loadChildren: './features/angularjs/angularjs.module#AngularJsModule' },
      {
        path: 'dashboard',
        canLoad: [SessionGuard],
        canActivate: [ProfileGuard],
        loadChildren: './features/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'communicator',
        canActivate: [SessionGuard],
        loadChildren: './features/communicator/communicator.module#CommunicatorViewModule',
      },
      {
        path: RouterPaths.browse.getName,
        canActivate: [ProfileGuard],
        loadChildren: './features/browse/browse.module#BrowseModule',
      },
    ],
  },
  { path: 'unsupported', loadChildren: './features/unsupported/unsupported.module#UnsupportedModule' },
  { path: '**', loadChildren: './features/angularjs/angularjs.module#AngularJsModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      onSameUrlNavigation: 'reload',
    }),
  ],
  providers: [ProfileGuard, { provide: RouterPathsToken, useValue: RouterPaths }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
