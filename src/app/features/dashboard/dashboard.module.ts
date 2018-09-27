import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { EmployeesComponent } from './views/company-dashboard/employees/employees.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileModalModule } from '../../shared/components/modals/profile/profile.module';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CompanyDashboardModule } from './views/company-dashboard/company-dashboard.module';
import { ActivitiesViewComponent } from './views/user-dashboard/activities/activities.view.component';
import { ExpertActivitiesViewComponent } from './views/user-dashboard/activities/views/expert-activities/expert-activities.view.component';
import { ClientActivitiesViewComponent } from './views/user-dashboard/activities/views/client-activities/client-activities.view.component';
import { DashboardComponentsModule } from './components/components.module';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { SettingsModule } from '@platform/features/dashboard/views/user-dashboard/settings/settings.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DiscoverComponent,
    ActivitiesViewComponent,
    ExpertActivitiesViewComponent,
    ClientActivitiesViewComponent,
    EmployeesComponent,
    FavouritesComponent,
    NotFoundComponent,
  ],
  imports: [
    AngularJsProvidersModule,
    ReactiveFormsModule,
    NavbarModule,
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ProfileModalModule,
    InputsModule,
    CompanyDashboardModule,
    SettingsModule,
    DashboardComponentsModule,
  ],
})
export class DashboardModule {}
