import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import {
  CompanyActivitiesComponent
} from './views/company-dashboard/company-activities/company-activities.view.component';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { ClientActivitiesComponent } from './views/user-dashboard/client-activities/client-activities.view.component';
import { EmployeesComponent } from './views/company-dashboard/employees/employees.view.component';
import { ExpertActivitiesComponent } from './views/user-dashboard/expert-activities/expert-activities.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { CompanyDashboardComponent } from './views/company-dashboard/company-dashboard.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { ModalsModule } from '../../shared/components/modals/modals.module';
import { SettingsViewComponent } from './views/user-dashboard/settings/settings.view.component';
import { SettingOptionComponent } from './views/user-dashboard/settings/components/setting-option/setting-option.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    CompanyDashboardComponent,
    CompanyActivitiesComponent,
    DiscoverComponent,
    ClientActivitiesComponent,
    EmployeesComponent,
    ExpertActivitiesComponent,
    FavouritesComponent,
    SettingsViewComponent,
    SettingOptionComponent
  ],
  providers: [],
  imports: [
    SharedModule,
    AngularJsProvidersModule,
    DashboardRoutingModule,
    ModalsModule
  ]
})
export class DashboardModule {

  constructor() {
  }
}
