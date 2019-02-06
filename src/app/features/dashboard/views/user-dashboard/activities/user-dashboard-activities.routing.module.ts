import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivitiesViewComponent } from './activities.view.component';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ActivitiesComponent } from '@platform/features/dashboard/views/activities/activities.component';
import { ExpertActivitiesViewResolver } from './views/expert-activities/expert-activities.view.resolver';
import { ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.interface';
import { ExpertDashboardGuard } from '@platform/features/dashboard/views/user-dashboard/expert-dashboard/services/expert-dashboard.guard';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'expert',
      },
      {
        path: RouterPaths.dashboard.user.activities.expert.getName,
        canActivate: [ExpertDashboardGuard],
        resolve: {
          userType: ExpertActivitiesViewResolver,
        },
        component: ActivitiesComponent,
        data: { activityListType: ActivityListTypeEnum.EXPERT },
      },
      {
        path: RouterPaths.dashboard.user.activities.client.getName,
        component: ActivitiesComponent,
        data: { activityListType: ActivityListTypeEnum.CLIENT },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UserDashboardActivitiesRoutingModule {}
