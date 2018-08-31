import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterPaths } from '../../shared/routes/routes';
import { BrowseComponent } from './browse.component';

const routes: Routes = [
  {
    path: '',
    component: BrowseComponent,
    children: [
      {
        path: RouterPaths.browse.user.getName,
        loadChildren:
          'app/features/dashboard/views/user-dashboard/expert-dashboard/expert-dashboard.module#ExpertDashboardModule',
      },
      {
        path: RouterPaths.browse.company.getName,
        loadChildren:
          'app/features/dashboard/views/company-dashboard/company-profile/company-profile.module#CompanyProfileModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseRoutingModule {}
