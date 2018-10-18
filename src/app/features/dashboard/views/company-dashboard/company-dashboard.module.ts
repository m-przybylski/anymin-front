import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.view.component';
import { DashboardComponentsModule } from '../../components/components.module';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { SharedModule } from '@platform/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, DashboardComponentsModule, NavbarModule],
  declarations: [CompanyDashboardComponent, CompanyActivitiesComponent],
  exports: [CompanyDashboardComponent, CompanyActivitiesComponent],
})
export class CompanyDashboardModule {}
