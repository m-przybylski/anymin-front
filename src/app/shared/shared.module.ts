import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsServiceProvider } from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import {
  CommunicatorModule, CommunicatorService,
  CommunicatorSessionService, AnymindComponentsModule
} from '@anymind-ng/core';
import { CommunicatorConfigFactory } from './factories/communicator-config/communicator-config.factory';
import { Config } from '../../config';
import { UnsupportedGuard } from '../features/unsupported/unsupported.guard';
import { SessionGuard } from './guards/session/session.guard';
import { AnonymousGuard } from './guards/anonymous/anonymous.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LoginBackgroundComponent } from './components/login-background/login-background.component';
import { LoginContentComponent } from './components/login-content/login-content.component';
import { LoginMobileFooterComponent } from './components/login-mobile-footer/login-mobile-footer.component';
import { RouterModule } from '@angular/router';
import { WidgetGeneratorComponent } from './components/widget-generator/widget-generator.component';
import { WidgetGeneratorService } from './components/widget-generator/widget-generator.service';
import { DropdownPrimaryDirective } from './directives/dropdown/dropdown.directive';
import { RadioButtonDirective } from './directives/radio/radio.directive';
import { CommonSettingsService } from '../../angularjs/common/services/common-settings/common-settings.service';
import { MsisdnGuard } from './guards/msisdn/msisdn.guard';
import { LocalStorageWrapperService } from './services/local-storage/local-storage.service';
import { RegistrationInvitationService } from './services/registration-invitation/registration-invitation.service';
import { InputSetPasswordComponent } from './components/inputs/input-set-password/input-set-password.component';
import { PinCodeTimerService } from './services/pin-code-timer/pin-code.timer.service';
import {
  ContentHeightAnimateDirective
}
  from './directives/animation/content-height/content-height.animation.directive';
import { ContentHeightAnimationService } from './services/animation/content-height/content-height.animation.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserNavigationComponent } from './components/navbar/user-navigation/user-navigation.component';
import {
  UserNavigationUnderlineDirective
} from './components/navbar/user-navigation/user-navigation-underline.directive';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import {
  NavbarUserAvatarComponent
} from './components/navbar/navbar-user-avatar/navbar-user-avatar.component';
import { NavbarUserMenuComponent } from './components/navbar/navbar-user-menu/navbar-user-menu.component';
import { NavbarCompanyMenuComponent } from './components/navbar/navbar-company-menu/navbar-company-menu.component';
import { NavbarExpertMenuComponent } from './components/navbar/navbar-expert-menu/navbar-expert-menu.component';
import { InputSwitchComponent } from './components/inputs/input-switch/input-switch.component';
import { NavbarMenuService } from './services/navbar-menu-service/navbar-menu.service';
import { PreloaderContainerComponent } from './components/preloader/preloader-container.component';
import { UserNavigationComponentService } from './components/navbar/user-navigation/user-navigation.component.service';
import { ConsultationTagsComponent } from './components/consultation-tags/consultation-tags.component';
import { ConsultationPriceComponent } from './components/consultation-price/consultation-price.component';
import { InputTagsComponent } from './components/consultation-tags/input-tags/input-tags.component';
import { DropdownListComponent } from './components/dropdown/dropdown/dropdown-list/dropdown-list.component';
import {
  ScrollToElementDirective
}
  from './components/dropdown/dropdown/dropdown-list/scroll-to-element.directive';
import { DropdownComponent } from './components/dropdown/dropdown/dropdown.component';
import { OnElementClickDirective } from './components/dropdown/dropdown/on-element-click.directive';
import { InputAddItemComponent } from './components/inputs/input-add-item/input-add-item.component';
import { ValidationDirective } from './directives/validation/validation.directive';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommunicatorModule.forRoot(CommunicatorConfigFactory, Config.communicator.reconnectTimeout),
    NgbModule,
    TranslateModule.forChild(),
    AnymindComponentsModule,
    RouterModule
  ],
  declarations: [
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    DropdownPrimaryDirective,
    RadioButtonDirective,
    WidgetGeneratorComponent,
    InputSetPasswordComponent,
    ContentHeightAnimateDirective,
    NavbarComponent,
    UserNavigationComponent,
    UserNavigationUnderlineDirective,
    NavbarUserAvatarComponent,
    UserAvatarComponent,
    NavbarUserMenuComponent,
    NavbarCompanyMenuComponent,
    NavbarExpertMenuComponent,
    InputSwitchComponent,
    PreloaderContainerComponent,
    ConsultationTagsComponent,
    ConsultationPriceComponent,
    InputTagsComponent,
    DropdownListComponent,
    ScrollToElementDirective,
    DropdownComponent,
    OnElementClickDirective,
    InputAddItemComponent,
    ValidationDirective
  ],
  entryComponents: [WidgetGeneratorComponent],
  exports: [
    AnymindComponentsModule,
    TranslateModule,
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    InputSetPasswordComponent,
    ContentHeightAnimateDirective,
    NavbarComponent,
    UserAvatarComponent,
    PreloaderContainerComponent,
    ConsultationTagsComponent,
    ConsultationPriceComponent,
    InputTagsComponent,
    InputSwitchComponent,
    DropdownListComponent,
    DropdownComponent,
    InputAddItemComponent,
    ValidationDirective
  ],
  providers: [
    EventsServiceProvider,
    CommunicatorService,
    CommunicatorSessionService,
    UnsupportedGuard,
    AnonymousGuard,
    SessionGuard,
    WidgetGeneratorService,
    CommonSettingsService,
    MsisdnGuard,
    LocalStorageWrapperService,
    RegistrationInvitationService,
    PinCodeTimerService,
    ContentHeightAnimationService,
    NavbarMenuService,
    UserNavigationComponentService
  ]
})

export class SharedModule {
}
