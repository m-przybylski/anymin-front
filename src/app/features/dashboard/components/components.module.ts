import { SocialLinksComponent } from './social-links.ts/social-links';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule, DatePipe } from '@angular/common';
import { ConsultationRowComponent } from './consultation-row/consultation-row.component';
import { ConsultationStatComponent } from './consultation-stat/consultation-stat.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { EmptyNumberPipe } from './pipes/empty-number.pipe';
import { DashboardProfileHeaderComponent } from './dashboard-profile-header/dashboard-profile-header.component';
import { ConsultationCompanyRowComponent } from './consultation-company-row/consultation-company-row.component';
import { ConsultationExpertsComponent } from './consultation-experts/consultation-experts.component';
import { IconModule, ButtonModule } from '../../../shared/components/atomic-components/index';
import { UserAvatarModule } from '../../../shared/components/user-avatar/user-avatar.module';
import { DecorateDatePipe } from './pipes/decorate-date.pipe';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';
import { FilePreviewModule } from '@platform/shared/components/modals/file-preview/file-preview.module';
import { ActivityRowComponent } from '@platform/features/dashboard/components/activity-row/activity-row.component';
import { MoneyDisplayModule } from '@platform/shared/components/money-display/money-display.module';
import { ExpertOrganizationComponent } from './expert-organization-loader/expert-organization-loader.component';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';
import { ConsultationFooterModule } from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AnymindComponentsModule,
    IconModule,
    ButtonModule,
    UserAvatarModule,
    FilePreviewModule,
    ExpertAvailabilityModule,
    MoneyDisplayModule,
    ContentLoaderModule,
    ConsultationFooterModule,
  ],
  declarations: [
    SocialLinksComponent,
    ConsultationRowComponent,
    ConsultationCompanyRowComponent,
    ConsultationExpertsComponent,
    ConsultationStatComponent,
    DashboardProfileHeaderComponent,
    EmptyNumberPipe,
    DecorateDatePipe,
    ActivityRowComponent,
    ExpertOrganizationComponent,
  ],
  providers: [DatePipe],
  exports: [
    SocialLinksComponent,
    ConsultationRowComponent,
    ConsultationCompanyRowComponent,
    ConsultationExpertsComponent,
    ConsultationStatComponent,
    DashboardProfileHeaderComponent,
    DecorateDatePipe,
    IconModule,
    ButtonModule,
    ActivityRowComponent,
    ExpertOrganizationComponent,
  ],
})
export class DashboardComponentsModule {}
