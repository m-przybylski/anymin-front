import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { ClientActivitiesComponent } from './views/user-dashboard/client-activities/client-activities.view.component';
import { EmployeesComponent } from './views/company-dashboard/employees/employees.view.component';
import { ExpertActivitiesComponent } from './views/user-dashboard/expert-activities/expert-activities.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileModalModule } from '../../shared/components/modals/profile/profile.module';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CompanyDashboardModule } from './views/company-dashboard/company-dashboard.module';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { SettingsModule } from '@platform/features/dashboard/views/user-dashboard/settings/settings.module';
import { ExpertAvailabilityService } from './components/expert-availability/expert-availablity.service';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DiscoverComponent,
    ClientActivitiesComponent,
    EmployeesComponent,
    ExpertActivitiesComponent,
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
  ],
  providers: [ExpertAvailabilityService],
})
export class DashboardModule {}
