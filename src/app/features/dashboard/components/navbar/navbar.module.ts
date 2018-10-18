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
  ],
  declarations: [
    NavbarComponent,
    UserNavigationComponent,
    UserNavigationUnderlineDirective,
    NavbarUserAvatarComponent,
    NavbarUserMenuComponent,
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
