import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from '../../shared/routes/routes';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { CompanyActivitiesComponent } from './views/company-dashboard/company-activities/company-activities.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { CompanyDashboardComponent } from './views/company-dashboard/company-dashboard.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { CompanyDashboardViewGuard } from './views/company-dashboard/company-dashboard.view.guard';
import { ActivitiesViewComponent } from './views/user-dashboard/activities/activities.view.component';
import { ExpertActivitiesViewComponent } from './views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';
import { ClientActivitiesViewComponent } from './views/user-dashboard/activities/views/client-activities/client-activities.view.component';
import { SessionGuard } from '../../shared/guards/session/session.guard';
import { DashboardViewComponent } from '@platform/features/dashboard/dashboard.view.component';
import { DashboardResolver } from './dashboard.resolver';
import { ExpertActivitiesResolverService } from './views/user-dashboard/activities/views/expert-activities/expert-activities.resolver.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [SessionGuard],
    component: DashboardViewComponent,
    resolve: { userStatus: DashboardResolver },
    children: [
      {
        path: RouterPaths.dashboard.user.getName,
        component: UserDashboardComponent,
        children: [
          { path: 'discover', component: DiscoverComponent },
          {
            path: 'activities',
            component: ActivitiesViewComponent,
            children: [
              {
                path: 'expert',
                component: ExpertActivitiesViewComponent,
                resolve: { activities: ExpertActivitiesResolverService },
              },
              { path: '', pathMatch: 'full', redirectTo: 'expert' },
              {
                path: 'client',
                component: ClientActivitiesViewComponent,
                redirectTo: '/dashboard/user/activities/expert',
              },
            ],
          },
          { path: 'favourites', component: FavouritesComponent },
          {
            path: RouterPaths.dashboard.user.settings.getName,
            loadChildren: './views/user-dashboard/settings/settings.module#SettingsModule',
          },
          {
            path: RouterPaths.dashboard.user.payments.getName,
            loadChildren: './views/user-dashboard/payments/payments.module#PaymentsModule',
          },
          {
            path: RouterPaths.dashboard.user.recommendFriends.getName,
            loadChildren: './views/user-dashboard/recommend-friends/recommend-friends.module#RecommendFriendsModule',
          },
          {
            path: RouterPaths.dashboard.user.profile.getName,
            loadChildren: './views/user-dashboard/expert-dashboard/expert-dashboard.module#ExpertDashboardModule',
          },
          {
            path: RouterPaths.dashboard.user.invitations.getName,
            loadChildren: './views/user-dashboard/invitations/invitations.module#InvitationsModule',
          },
        ],
      },
      {
        path: RouterPaths.dashboard.company.getName,
        component: CompanyDashboardComponent,
        children: [
          { path: 'activities', component: CompanyActivitiesComponent, canActivate: [CompanyDashboardViewGuard] },
          {
            path: RouterPaths.dashboard.company.profile.getName,
            loadChildren: './views/company-dashboard/company-profile/company-profile.module#CompanyProfileModule',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CompanyDashboardViewGuard, ExpertActivitiesResolverService],
})
export class DashboardRoutingModule {}
