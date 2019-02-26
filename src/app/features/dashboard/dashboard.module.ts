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
import { RecommendFriendsModule } from '@platform/features/dashboard/views/user-dashboard/recommend-friends/recommend-friends.module';
import { EmployeesInviteService } from '@platform/shared/components/modals/invitations/employees-invite/employees-invite.service';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { GenerateWidgetModule } from '@platform/shared/components/modals/generate-widget/generate-widget.module';
import { AddPaymentCardModule } from '@platform/shared/components/modals/payments/add-payment-card/add-payment-card.module';
import { PromoCodeModule } from '@platform/shared/components/modals/payments/promo-code/promo-code.module';

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
    RecommendFriendsModule,
    DashboardComponentsModule,
    GenerateWidgetModule,
    AddPaymentCardModule,
    PromoCodeModule,
  ],
  providers: [EmployeesInviteService, DashboardResolver],
})
export class DashboardModule {}
