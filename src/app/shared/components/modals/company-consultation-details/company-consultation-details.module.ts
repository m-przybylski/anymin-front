import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyConsultationDetailsViewComponent } from '@platform/shared/components/modals/company-consultation-details/company-consultation-details.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { SharedModule } from '@platform/shared/shared.module';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { CompanyEmployeeRowComponent } from './company-employee-row/company-employee-row.component';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { ConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/consultation-details.view.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    ModalsModule,
    UserAvatarModule,
  ],
  declarations: [CompanyConsultationDetailsViewComponent, CompanyEmployeeRowComponent],
  entryComponents: [CompanyConsultationDetailsViewComponent],
  providers: [ExpertAvailabilityService],
})
export class CompanyConsultationDetailsModule {}
