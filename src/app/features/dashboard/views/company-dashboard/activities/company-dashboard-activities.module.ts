import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardActivitiesRoutingModule } from '@platform/features/dashboard/views/company-dashboard/activities/company-dashboard-activities.routing.module';
import { ActivitiesModule } from '@platform/features/dashboard/views/activities/activities.module';
import { CompanyActivitiesViewComponent } from './views/company.activities.view.component';

@NgModule({
  imports: [CommonModule, ActivitiesModule, CompanyDashboardActivitiesRoutingModule],
  declarations: [CompanyActivitiesViewComponent],
})
export class CompanyDashboardActivitiesModule {}
