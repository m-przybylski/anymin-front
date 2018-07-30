import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ExpertDashboardResolverService } from './expert-dashboard-resolver.service';
import { ExpertDashboardHeaderComponent } from './expert-dashboard-consultation/expert-dashboard-header.component';
import { ExpertDashboardConsultationsComponent } from './export-dashboard-header/expert-dashboard-consultation.component';
import { ExpertDashboardComponent } from './expert-dashboard.view.component';
import { DashboardComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ExpertDashboardComponent, ExpertDashboardHeaderComponent, ExpertDashboardConsultationsComponent],
  imports: [CommonModule, SharedModule, DashboardComponentsModule],
  providers: [ExpertDashboardResolverService],
})
export class ExpertDashboardModule {}
