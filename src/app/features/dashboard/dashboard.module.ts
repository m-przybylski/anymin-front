import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import { CompanyActivitiesComponent } from './views/company-activities/company-activities.component';
import { DiscoverComponent } from './views/discover/discover.component';

@NgModule({
  declarations: [
    CompanyActivitiesComponent,
    DiscoverComponent
  ],
  providers: [
  ],
  imports: [
    SharedModule,
    AngularJsProvidersModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {

  constructor() {
  }
}
