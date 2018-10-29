import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyConsultationDetailsViewComponent } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.component';
import { ModalsModule } from '@platform/shared/components/modals/modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponentsModule } from '@platform/features/dashboard/components/components.module';
import { CompanyEmployeeRowComponent } from './company-employee-row/company-employee-row.component';
import { ConsultationDetailsComponentModule } from '@platform/features/dashboard/components/consultation-details/consultation-details.component.module';
import { EmployeesInviteService } from '../../invitations/employees-invite/employees-invite.service';
import { ExpertAvailabilityModule } from '@platform/features/dashboard/components/expert-availability/expert-availability.module';
import { ConsultationFooterModule } from '../../consultation-details/consultation-footers/consultation-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardComponentsModule,
    ModalsModule,
    ConsultationDetailsComponentModule,
    ConsultationFooterModule,
    ExpertAvailabilityModule.forRoot(),
  ],
  exports: [ConsultationDetailsComponentModule],
  declarations: [CompanyConsultationDetailsViewComponent, CompanyEmployeeRowComponent],
  providers: [EmployeesInviteService],
  entryComponents: [CompanyConsultationDetailsViewComponent],
})
export class CompanyConsultationDetailsModule {}
