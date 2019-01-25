import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FavouritesComponent } from './views/user-dashboard/favourites/favourites.view.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileModalModule } from '../../shared/components/modals/profile/profile.module';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DashboardComponentsModule } from './components/components.module';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { SettingsModule } from '@platform/features/dashboard/views/user-dashboard/settings/settings.module';
import { DashboardViewComponent } from '@platform/features/dashboard/dashboard.view.component';
import { DashboardResolver } from './dashboard.resolver';
import { PaymentsModule } from '@platform/features/dashboard/views/user-dashboard/payments/payments.module';
import { RecommendFriendsModule } from '@platform/features/dashboard/views/user-dashboard/recommend-friends/recommend-friends.module';
import { EmployeesInviteService } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@platform/features/dashboard/reducers';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from '@platform/features/dashboard/effects/activities.effects';
import { VisibilityEffects } from '@platform/features/dashboard/effects/visibility/visibility.effects';
import { GenerateWidgetModule } from '@platform/shared/components/modals/generate-widget/generate-widget.module';
import { WelcomeModule } from '@platform/features/dashboard/views/user-dashboard/welcome/welcome.module';
import { InvitationsEffects } from '@platform/features/dashboard/effects/invitations/invitations.effects';
import { AddPaymentCardModule } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.module';

@NgModule({
  declarations: [DashboardViewComponent, UserDashboardComponent, FavouritesComponent, NotFoundComponent],
  imports: [
    ReactiveFormsModule,
    NavbarModule,
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ProfileModalModule,
    InputsModule,
    SettingsModule,
    WelcomeModule,
    PaymentsModule,
    RecommendFriendsModule,
    DashboardComponentsModule,
    GenerateWidgetModule,
    AddPaymentCardModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature([DashboardEffects, VisibilityEffects, InvitationsEffects]),
  ],
  providers: [EmployeesInviteService, DashboardResolver],
})
export class DashboardModule {}
