import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';
import { DiscoverComponent } from './views/user-dashboard/discover/discover.view.component';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileModalModule } from '../../shared/components/modals/profile/profile.module';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { CompanyDashboardModule } from './views/company-dashboard/company-dashboard.module';
import { DashboardComponentsModule } from './components/components.module';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { SettingsModule } from '@platform/features/dashboard/views/user-dashboard/settings/settings.module';
import { DashboardViewComponent } from '@platform/features/dashboard/dashboard.view.component';
import { DashboardResolver } from './dashboard.resolver';
import { PaymentsModule } from '@platform/features/dashboard/views/user-dashboard/payments/payments.module';
import { RecommendFriendsModule } from '@platform/features/dashboard/views/user-dashboard/recommend-friends/recommend-friends.module';
import { EmployeesInviteService } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { StepperModule } from '@platform/shared/components/stepper/stepper.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@platform/features/dashboard/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ActivitiesEffects } from '@platform/features/dashboard/effects/activities.effects';
import { VisibilityEffects } from '@platform/features/dashboard/effects/visibility/visibility.effects';

@NgModule({
  declarations: [
    DashboardViewComponent,
    UserDashboardComponent,
    DiscoverComponent,
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
    PaymentsModule,
    RecommendFriendsModule,
    DashboardComponentsModule,
    StepperModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature([ActivitiesEffects, VisibilityEffects]),
  ],
  providers: [EmployeesInviteService, DashboardResolver],
})
export class DashboardModule {}
