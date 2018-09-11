import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './navbar.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { UserNavigationUnderlineDirective } from './user-navigation/user-navigation-underline.directive';
import { NavbarUserAvatarComponent } from './navbar-user-avatar/navbar-user-avatar.component';
import { NavbarUserMenuComponent } from './navbar-user-menu/navbar-user-menu.component';
import { NavbarCompanyMenuComponent } from './navbar-company-menu/navbar-company-menu.component';
import { NavbarExpertMenuComponent } from './navbar-expert-menu/navbar-expert-menu.component';
import { UserNavigationComponentService } from './user-navigation/user-navigation.component.service';
import { NavbarMenuService } from './navbar-menu-service/navbar-menu.service';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { RouterModule } from '@angular/router';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  imports: [CommonModule, UserAvatarModule, RouterModule, InputsModule, TranslateModule.forChild()],
  declarations: [
    NavbarComponent,
    UserNavigationComponent,
    UserNavigationUnderlineDirective,
    NavbarUserAvatarComponent,
    NavbarUserMenuComponent,
    NavbarCompanyMenuComponent,
    NavbarExpertMenuComponent,
  ],
  exports: [NavbarComponent],
  providers: [NavbarMenuService, UserNavigationComponentService],
})
export class NavbarModule {}
