import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { SharedModule } from '@platform/shared/shared.module';
import { ActivityDetailsModule } from '@platform/shared/components/modals/activity-details/activity-details.module';
import { ActivitiesModule } from '@platform/features/dashboard/views/activities/activities.module';
import { CompanyActivitiesComponent } from '@platform/features/dashboard/views/company-dashboard/activities/activities.view.component';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { CompanyDashboardActivitiesRoutingModule } from '@platform/features/dashboard/views/company-dashboard/activities/company-dashboard-activities.routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    DashboardComponentsModule,
    NavbarModule,
    ActivityDetailsModule,
    CompanyDashboardActivitiesRoutingModule,
    ActivitiesModule,
  ],
  declarations: [CompanyActivitiesComponent],
  exports: [CompanyActivitiesComponent],
})
export class CompanyDashboardActivitiesModule {}
