import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpertActivitiesViewComponent } from './views/expert-activities/expert-activities.view.component';
import { ClientActivitiesViewComponent } from './views/client-activities/client-activities.view.component';
import { ActivitiesViewComponent } from './activities.view.component';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ExpertActivitiesGuard } from './services/expert-activities.guard';

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
        component: ExpertActivitiesViewComponent,
        canActivate: [ExpertActivitiesGuard],
      },
      {
        path: RouterPaths.dashboard.user.activities.client.getName,
        component: ClientActivitiesViewComponent,
        redirectTo: '/dashboard/user/activities/expert',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ExpertActivitiesGuard],
})
export class UserDashboardActivitiesRoutingModule {}
