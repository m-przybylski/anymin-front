import { NgModule } from '@angular/core';
import { BrowseRoutingModule } from './browse.routing.module';
import { BrowseComponent } from './browse.component';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import { ConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/consultation-details.view.module';
import { CompanyConsultationDetailsModule } from '@platform/shared/components/modals/consultation-details/company-consultation-details/company-consultation-details.view.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [BrowseRoutingModule, AngularJsProvidersModule, ConsultationDetailsModule, CompanyConsultationDetailsModule],
})
export class BrowseModule {}
