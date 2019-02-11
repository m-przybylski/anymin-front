import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { CompanyDashboardViewResolver } from './company-dashboard.view.resolver';
import { CompanyDashboardGuard } from './services/company-dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyDashboardComponent,
    resolve: {
      userType: CompanyDashboardViewResolver,
    },
    children: [
      {
        path: 'activities',
        canActivate: [CompanyDashboardGuard],
        loadChildren: './activities/company-dashboard-activities.module#CompanyDashboardActivitiesModule',
      },
      {
        path: RouterPaths.dashboard.company.profile.getName,
        loadChildren: './company-profile/company-profile.module#CompanyProfileModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyDashboardRoutingModule {}
