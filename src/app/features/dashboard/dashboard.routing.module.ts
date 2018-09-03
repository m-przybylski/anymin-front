import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPaths } from '../../shared/routes/routes';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { CompanyActivitiesComponent } from './views/company-dashboard/company-activities/company-activities.view.component';
import { ClientActivitiesComponent } from './views/user-dashboard/client-activities/client-activities.view.component';
import { EmployeesComponent } from './views/company-dashboard/employees/employees.view.component';
import { ExpertActivitiesComponent } from './views/user-dashboard/expert-activities/expert-activities.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { CompanyDashboardComponent } from './views/company-dashboard/company-dashboard.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { SettingsViewComponent } from './views/user-dashboard/settings/settings.view.component';
import { CompanyDashboardViewGuard } from './views/company-dashboard/company-dashboard.view.guard';
import { SessionGuard } from '../../shared/guards/session/session.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [SessionGuard],
    children: [
      {
        path: RouterPaths.dashboard.user.getName,
        component: UserDashboardComponent,
        children: [
          { path: 'discover', component: DiscoverComponent },
          { path: 'client-activities', component: ClientActivitiesComponent },
          { path: 'expert-activities', component: ExpertActivitiesComponent },
          { path: 'favourites', component: FavouritesComponent },
          { path: 'settings', component: SettingsViewComponent },
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
          { path: 'employees', component: EmployeesComponent, canActivate: [CompanyDashboardViewGuard] },
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
  providers: [CompanyDashboardViewGuard],
})
export class DashboardRoutingModule {}
