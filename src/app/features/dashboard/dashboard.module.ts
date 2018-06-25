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
import { SettingsViewComponent } from './views/user-dashboard/settings/settings.view.component';
import {
  SettingOptionComponent
} from './views/user-dashboard/settings/components/setting-option/setting-option.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  SmsConfirmationComponent
} from './views/user-dashboard/settings/components/change-number/sms-confirmation/sms-confirmation.component';
import { EditProfileModule } from '../../shared/components/navbar/edit-profile/edit-profile.module';

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
    SettingOptionComponent,
    SmsConfirmationComponent

  ],
  entryComponents: [],
  providers: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    AngularJsProvidersModule,
    DashboardRoutingModule,
    EditProfileModule
  ]
})
export class DashboardModule {

  constructor() {
  }
}
