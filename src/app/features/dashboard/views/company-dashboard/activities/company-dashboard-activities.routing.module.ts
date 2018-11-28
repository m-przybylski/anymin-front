import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivitiesComponent } from '@platform/features/dashboard/views/activities/activities.component';
import { CompanyActivitiesViewComponent } from './views/company.activities.view.component';
import { ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.interface';

const routes: Routes = [
  {
    path: '',
    component: CompanyActivitiesViewComponent,
    children: [
      {
        path: '',
        component: ActivitiesComponent,
        data: { activityListType: ActivityListTypeEnum.COMPANY },
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
