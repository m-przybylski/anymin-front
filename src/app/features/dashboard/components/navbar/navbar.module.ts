import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './navbar.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { UserNavigationUnderlineDirective } from './user-navigation/user-navigation-underline.directive';
import { NavbarUserAvatarComponent } from './navbar-user-avatar/navbar-user-avatar.component';
import { NavbarUserMenuComponent } from './navbar-user-menu/navbar-user-menu.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { UserAvatarModule } from '@platform/shared/components/user-avatar/user-avatar.module';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { NAVIGATIONITEMS, navigationItems } from '@platform/features/dashboard/components/navbar/navigation';
import { ActivitiesCounterModule } from '@platform/features/dashboard/components/activities-counter/activities-counter.module';
import { NavbarHelpModule } from '@platform/features/dashboard/components/navbar/navbar-help/navbar-help.module';
import { UnloggedNavigationComponent } from './unlogged-navigation/unlogged-navigation.component';
import { ManageProfileModalsModule } from '@platform/shared/components/modals/profile/profile-modals/profile-modals.module';

@NgModule({
  imports: [
    CommonModule,
    UserAvatarModule,
    RouterModule,
    InputsModule,
    ReactiveFormsModule,
    IconModule,
    ButtonModule,
    TranslateModule.forChild(),
    ActivitiesCounterModule,
    NavbarHelpModule,
    ManageProfileModalsModule,
  ],
  declarations: [
    NavbarComponent,
    UserNavigationComponent,
    UserNavigationUnderlineDirective,
    NavbarUserAvatarComponent,
    NavbarUserMenuComponent,
    UnloggedNavigationComponent,
  ],
  exports: [NavbarComponent],
  providers: [
    {
      provide: NAVIGATIONITEMS,
      useValue: navigationItems,
    },
  ],
})
export class NavbarModule {}
