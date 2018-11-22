import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivitiesComponent } from '@platform/features/dashboard/views/activities/activities.component';
import { ActivitiesGuard } from '@platform/features/dashboard/views/activities/activities.guard';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesComponent,
    canActivate: [ActivitiesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CompanyDashboardActivitiesRoutingModule {}
