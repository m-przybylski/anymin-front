import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@platform/shared/shared.module';
import { DashboardComponentsModule } from '../../../components/components.module';
import { RouterModule } from '@angular/router';
import { CompanyProfileComponent } from './company-profile.view.component';
import { CompanyProfileConsultationsComponent } from './company-profile-consultation/company-profile-consultation.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { CompanyProfileService } from './services/company-profile.service';
import { EffectsModule } from '@ngrx/effects';
import { CompanyProfileEffects } from './effects/company-profile.effects';
import { CompanyConsultationDetailsViewComponent } from './company-consultation-details/company-consultation-details.view.component';
import { CompanyEmployeeRowComponent } from './company-consultation-details/company-employee-row/company-employee-row.component';
import { ConsultationDetailsComponentModule } from '@platform/features/dashboard/components/consultation-details/consultation-details.component.module';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';
import { RouterPaths } from '@platform/shared/routes/routes';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { CompanyConsultationEffects } from './effects/company-consultation.effects';
import { CompanyConsultationService } from './services/company-consultation.service';

@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompanyProfileConsultationsComponent,
    CompanyConsultationDetailsViewComponent,
    CompanyEmployeeRowComponent,
  ],
  imports: [
    ModalsModule,
    StoreModule.forFeature('company', reducers),
    EffectsModule.forFeature([CompanyProfileEffects, CompanyConsultationEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: CompanyProfileComponent,
      },
      {
        path: RouterPaths.dashboard.company.profile.service.getName,
        component: CompanyConsultationDetailsViewComponent,
      },
    ]),
    CommonModule,
    SharedModule,
    DashboardComponentsModule,
    ConsultationDetailsComponentModule,
    ExpertAvailabilityModule,
  ],
  providers: [CompanyProfileService, CompanyProfileEffects, CompanyConsultationEffects, CompanyConsultationService],
})
export class CompanyProfileModule {}
