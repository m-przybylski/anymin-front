import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesViewComponent } from './activities.view.component';
import { UserDashboardActivitiesRoutingModule } from '@platform/features/dashboard/views/user-dashboard/activities/user-dashboard-activities.routing.module';
import { ExpertActivitiesViewComponent } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';
import { ClientActivitiesViewComponent } from '@platform/features/dashboard/views/user-dashboard/activities/views/client-activities/client-activities.view.component';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivityDetailsModule } from '@platform/shared/components/modals/activity-details/activity-details.module';
import { ActivitiesCounterModule } from '@platform/features/dashboard/components/activities-counter/activities-counter.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardComponentsModule,
    AnymindComponentsModule,
    TranslateModule,
    ActivityDetailsModule,
    UserDashboardActivitiesRoutingModule,
    ActivitiesCounterModule,
  ],
  declarations: [ActivitiesViewComponent, ExpertActivitiesViewComponent, ClientActivitiesViewComponent],
})
export class UserDashboardActivitiesModule {}
