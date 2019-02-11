import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { CompanyDashboardRoutingModule } from './company-dashboard.routing.module';
import { CompanyDashboardViewResolver } from './company-dashboard.view.resolver';

@NgModule({
  imports: [CommonModule, CompanyDashboardRoutingModule],
  declarations: [CompanyDashboardComponent],
  exports: [CompanyDashboardComponent],
  providers: [CompanyDashboardViewResolver],
})
export class CompanyDashboardModule {}
