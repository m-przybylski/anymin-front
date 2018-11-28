import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { CompanyDashboardRoutingModule } from './company-dashboard.routing.module';
import { CompanyDashboardViewResolver } from './company-dashboard.view.resolver';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

@NgModule({
  imports: [CommonModule, CompanyDashboardRoutingModule, StoreModule.forFeature('companyDashboard', reducers)],
  declarations: [CompanyDashboardComponent],
  exports: [CompanyDashboardComponent],
  providers: [CompanyDashboardViewResolver],
})
export class CompanyDashboardModule {}
