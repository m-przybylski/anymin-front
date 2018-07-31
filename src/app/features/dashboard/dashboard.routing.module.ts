import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import {
  CompanyActivitiesComponent
} from './views/company-dashboard/company-activities/company-activities.view.component';
import { ClientActivitiesComponent } from './views/user-dashboard/client-activities/client-activities.view.component';
import { EmployeesComponent } from './views/company-dashboard/employees/employees.view.component';
import { ExpertActivitiesComponent } from './views/user-dashboard/expert-activities/expert-activities.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { CompanyDashboardComponent } from './views/company-dashboard/company-dashboard.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { SettingsViewComponent } from './views/user-dashboard/settings/settings.view.component';
import { CompanyDashboardViewGuard } from './views/company-dashboard/company-dashboard.view.guard';
import { UserDashboardViewGuard } from './views/user-dashboard/user-dashboard.view.guard';

const routes: Routes = [
  {
    path: 'user', component: UserDashboardComponent, children: [
      {path: 'discover', component: DiscoverComponent},
      {path: 'client-activities', component: ClientActivitiesComponent},
      {path: 'expert-activities', component: ExpertActivitiesComponent},
      {path: 'favourites', component: FavouritesComponent},
      {path: 'settings', component: SettingsViewComponent}
      ],
    canActivate: [UserDashboardViewGuard]
  },
  {
    path: 'company', component: CompanyDashboardComponent, children: [
      {path: 'employees', component: EmployeesComponent},
      {path: 'activities', component: CompanyActivitiesComponent}
    ],
    canActivate: [CompanyDashboardViewGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CompanyDashboardViewGuard,
    UserDashboardViewGuard
  ]
})
export class DashboardRoutingModule {
}
