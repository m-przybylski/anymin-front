import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@platform/shared/shared.module';
import { ExpertDashboardConsultationsComponent } from './expert-dashboard-consultation/expert-dashboard-consultation.component';
import { ExpertDashboardComponent } from './expert-dashboard.view.component';
import { DashboardComponentsModule } from '../../../components/components.module';
import { RouterModule } from '@angular/router';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';
import { WarningInformationModule } from '@platform/shared/components/warning-information/warning-information.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ExpertDashboardEffects } from './effects/expert-dashboard.effects';
import { ExpertDashboardService } from './services/expert-dashboard.service';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';

@NgModule({
  declarations: [ExpertDashboardComponent, ExpertDashboardConsultationsComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExpertDashboardComponent,
      },
    ]),
    StoreModule.forFeature('expertProfile', reducer),
    EffectsModule.forFeature([ExpertDashboardEffects]),
    CommonModule,
    SharedModule,
    ExpertAvailabilityModule,
    DashboardComponentsModule,
    ContentLoaderModule,
    WarningInformationModule,
  ],
  providers: [ExpertDashboardEffects, ExpertDashboardService],
})
export class ExpertDashboardModule {}
