import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UnsupportedGuard } from './features/unsupported/unsupported.guard';
import { SessionGuard } from './shared/guards/session/session.guard';
import { AnonymousGuard } from './shared/guards/anonymous/anonymous.guard';
import { RouterPaths } from './shared/routes/routes';
import { ProfileGuard } from './shared/guards/profile/profile.guard';
import { InvitationsGuard } from '@platform/features/invitations/invitations.guard';
import { InvitationsComponent } from '@platform/features/invitations/invitations.component';
import { ConfirmEmailGuard } from './features/confirm-email/confirm-email.guard';
import { ConfirmEmailComponent } from './features/confirm-email/confirm-email.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [UnsupportedGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'confirm-email/token/:token', canActivate: [ConfirmEmailGuard], component: ConfirmEmailComponent },
      { path: 'login', canActivate: [AnonymousGuard], loadChildren: './features/login/login.module#LoginModule' },
      { path: 'invitations/:token', canActivate: [InvitationsGuard], component: InvitationsComponent },
      {
        canActivate: [AnonymousGuard],
        path: 'forgot-password',
        loadChildren: './features/forgot-password/forgot-password.module#ForgotPasswordModule',
      },
      {
        canActivate: [AnonymousGuard],
        path: 'register',
        loadChildren: './features/register/register.module#RegisterModule',
      },
      {
        path: 'dashboard',
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
  { path: '**', redirectTo: RouterPaths.dashboard.user.welcome.asPath },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  providers: [ProfileGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
