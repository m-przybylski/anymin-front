import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpertActivitiesResolverService } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.resolver.service';
import { ExpertActivitiesViewComponent } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';
import { ClientActivitiesViewComponent } from '@platform/features/dashboard/views/user-dashboard/activities/views/client-activities/client-activities.view.component';
import { ActivitiesViewComponent } from '@platform/features/dashboard/views/user-dashboard/activities/activities.view.component';
import { RouterPaths } from '@platform/shared/routes/routes';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesViewComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'expert'
      },
      {
        path: RouterPaths.dashboard.user.activities.expert.getName,
        component: ExpertActivitiesViewComponent,
        resolve: {activities: ExpertActivitiesResolverService},
      },
      {
        path: RouterPaths.dashboard.user.activities.client.getName,
        component: ClientActivitiesViewComponent,
        redirectTo: '/dashboard/user/activities/expert',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardActivitiesRoutingModule {
}
