import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { DashboardComponentsModule } from '../../components/components.module';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { SharedModule } from '@platform/shared/shared.module';
import { ActivityDetailsModule } from '@platform/shared/components/modals/activity-details/activity-details.module';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, DashboardComponentsModule, NavbarModule, ActivityDetailsModule],
  declarations: [CompanyDashboardComponent],
  exports: [CompanyDashboardComponent],
})
export class CompanyDashboardModule {}
