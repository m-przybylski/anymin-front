import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard.view.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CompanyDashboardComponent],
  exports: [CompanyDashboardComponent],
})
export class CompanyDashboardModule {}
