import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivitiesViewComponent } from './activities.view.component';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ActivitiesComponent } from '@platform/features/dashboard/views/activities/activities.component';
import { ActivitiesGuard, ActivityListTypeEnum } from '@platform/features/dashboard/views/activities/activities.guard';
import { ExpertActivitiesViewResolver } from './views/expert-activities/expert-activities.view.resolver';

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
        resolve: {
          userType: ExpertActivitiesViewResolver,
        },
        component: ActivitiesComponent,
        canActivate: [ActivitiesGuard],
        data: { activityListType: ActivityListTypeEnum.EXPERT },
      },
      {
        path: RouterPaths.dashboard.user.activities.client.getName,
        redirectTo: '/dashboard/user/activities/expert',
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
