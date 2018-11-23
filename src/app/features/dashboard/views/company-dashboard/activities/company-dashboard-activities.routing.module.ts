import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivitiesComponent } from '@platform/features/dashboard/views/activities/activities.component';
import { ActivitiesGuard } from '@platform/features/dashboard/views/activities/activities.guard';
import { CompanyActivitiesViewComponent } from './views/company.activities.view.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyActivitiesViewComponent,
    children: [
      {
        path: '',
        component: ActivitiesComponent,
        canActivate: [ActivitiesGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CompanyDashboardActivitiesRoutingModule {}
