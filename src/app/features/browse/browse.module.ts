import { NgModule } from '@angular/core';
import { BrowseRoutingModule } from './browse.routing.module';
import { BrowseComponent } from './browse.component';
import { ConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/consultation-details.view.module';
import { CompanyConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.module';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [BrowseRoutingModule, ConsultationDetailsModule, CompanyConsultationDetailsModule, NavbarModule],
})
export class BrowseModule {}
