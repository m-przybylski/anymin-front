import { NgModule } from '@angular/core';
import { BrowseRoutingModule } from './browse.routing.module';
import { BrowseComponent } from './browse.component';
import { ConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/consultation-details.view.module';
import { CompanyConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.module';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { GenerateWidgetService } from '@platform/shared/components/modals/generate-widget/services/generate-widget.service';

@NgModule({
  declarations: [BrowseComponent],
  providers: [GenerateWidgetService],
  imports: [BrowseRoutingModule, ConsultationDetailsModule, CompanyConsultationDetailsModule, NavbarModule],
})
export class BrowseModule {}
