import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyProfileComponent } from './company-profile/company-profile.view.component';
import { CompanyDashboardComponent } from './company-dashboard.view.component';
import { CompanyActivitiesComponent } from './company-activities/company-activities.view.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CompanyProfileResolverService } from './services/company-profile-resolver.service';
import { DashboardComponentsModule } from '../../components/components.module';
import { CompanyProfileConsultationsComponent } from './company-profile/company-profile-consultation/company-profile-consultation.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, DashboardComponentsModule],
  declarations: [
    CompanyProfileComponent,
    CompanyDashboardComponent,
    CompanyActivitiesComponent,
    CompanyProfileConsultationsComponent,
  ],
  exports: [
    CompanyProfileComponent,
    CompanyDashboardComponent,
    CompanyActivitiesComponent,
    CompanyProfileConsultationsComponent,
  ],
  providers: [CompanyProfileResolverService],
})
export class CompanyDashboardModule {}
