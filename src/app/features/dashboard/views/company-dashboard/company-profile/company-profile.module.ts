import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@platform/shared/shared.module';
import { DashboardComponentsModule } from '../../../components/components.module';
import { RouterModule } from '@angular/router';
import { CompanyProfileComponent } from './company-profile.view.component';
import { CompanyProfileConsultationsComponent } from './company-profile-consultation/company-profile-consultation.component';
import { CompanyConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { CompanyProfileService } from './services/company-profile.service';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';
import { EffectsModule } from '@ngrx/effects';
import { CompanyProfileEffects } from './effects/company-profile.effects';

@NgModule({
  declarations: [CompanyProfileComponent, CompanyProfileConsultationsComponent],
  imports: [
    StoreModule.forFeature('companyProfile', reducer),
    EffectsModule.forFeature([CompanyProfileEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: CompanyProfileComponent,
      },
    ]),
    CommonModule,
    SharedModule,
    DashboardComponentsModule,
    CompanyConsultationDetailsModule,
    ContentLoaderModule,
  ],
  providers: [CompanyProfileService, CompanyProfileEffects],
})
export class CompanyProfileModule {}
