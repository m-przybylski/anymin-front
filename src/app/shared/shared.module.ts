import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsServiceProvider } from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import {
  CommunicatorModule, CommunicatorService,
  CommunicatorSessionService
} from '@anymind-ng/core';
import { CommunicatorConfigFactory } from './factories/communicator-config/communicator-config.factory';
import { Config } from '../../config';
import { UnsupportedGuard } from '../features/unsupported/unsupported.guard';
import { SessionGuard } from './guards/session/session.guard';
import { AnonymousGuard } from './guards/anonymous/anonymous.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LoginBackgroundComponent } from './components/login-background/login-background.component';
import { AnymindComponentsModule } from '@anymind-ng/components';
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
import { InputSetPasswordComponent } from './components/input-set-password/input-set-password.component';
import { PinCodeTimerService } from './services/pin-code-timer/pin-code.timer.service';
import {
  ContentHeightAnimateDirective
}
  from './directives/animation/content-height/content-height.animation.directive';
import { ContentHeightAnimationService } from './services/animation/content-height/content-height.animation.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserNavigationComponent } from './components/navbar/user-navigation/user-navigation.component';
import { ModalComponent } from './components/modals/modal.component';
import { PinElementDirective } from './directives/pin-element/pin-element.directive';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import {
  NavbarUserAvatarComponent
} from './components/navbar/navbar-user-avatar/navbar-user-avatar/navbar-user-avatar.component';

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
    ModalComponent,
    PinElementDirective,
    UserAvatarComponent,
    NavbarUserAvatarComponent
  ],
  entryComponents: [WidgetGeneratorComponent, ModalComponent],
  exports: [
    AnymindComponentsModule,
    TranslateModule,
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    InputSetPasswordComponent,
    ContentHeightAnimateDirective,
    NavbarComponent,
    UserAvatarComponent
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
    ContentHeightAnimationService
  ]
})

export class SharedModule {
}
