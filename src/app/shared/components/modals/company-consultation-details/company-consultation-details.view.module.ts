import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyConsultationDetailsViewComponent } from '@platform/shared/components/modals/company-consultation-details/company-consultation-details.view.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { SharedModule } from '@platform/shared/shared.module';
import { CompanyEmployeeRowComponent } from './company-employee-row/company-employee-row.component';
import { ConsultationDetailsComponentModule } from '@platform/features/dashboard/components/consultation-details/consultation-details.component.module';
import { EmployeesInviteService } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    ModalsModule,
    ConsultationDetailsComponentModule,
    ExpertAvailabilityModule.forRoot(),
  ],
  exports: [ConsultationDetailsComponentModule],
  declarations: [CompanyConsultationDetailsViewComponent, CompanyEmployeeRowComponent],
  providers: [EmployeesInviteService],
  entryComponents: [CompanyConsultationDetailsViewComponent],
})
export class CompanyConsultationDetailsModule {}
