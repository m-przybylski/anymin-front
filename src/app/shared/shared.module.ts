import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsServiceProvider } from './providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { CommunicatorModule, CommunicatorService, AnymindComponentsModule } from '@anymind-ng/core';
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
import { PinCodeTimerService } from './services/pin-code-timer/pin-code.timer.service';
import { ContentHeightAnimateDirective } from './directives/animation/content-height/content-height.animation.directive';
import { ContentHeightAnimationService } from './services/animation/content-height/content-height.animation.service';
import { PreloaderContainerComponent } from './components/preloader/preloader-container.component';
import { ConsultationTagsComponent } from './components/consultation-tags/consultation-tags.component';
import { ConsultationPriceComponent } from './components/consultation-price/consultation-price.component';
import { InputTagsComponent } from './components/consultation-tags/input-tags/input-tags.component';
import { DropdownListComponent } from './components/dropdown/dropdown/dropdown-list/dropdown-list.component';
import { ScrollToElementDirective } from './components/dropdown/dropdown/dropdown-list/scroll-to-element.directive';
import { DropdownComponent } from './components/dropdown/dropdown/dropdown.component';
import { ToggleElementDirective } from './components/dropdown/dropdown/on-element-click.directive';
import { ValidationDirective } from './directives/validation/validation.directive';
import { ProfileLinksComponentService } from './components/modals/profile/components/profile-links/profile-links.component.service';
import { PhoneNumberUnifyService } from './services/phone-number-unify/phone-number-unify.service';
import { ExpandablePanelComponent } from './components/expandable-panel/expandable-panel.component';
import { UserAvatarModule } from './components/user-avatar/user-avatar.module';
import { IconModule, ButtonModule } from './components/atomic-components/';
import { InputsModule } from './components/inputs/inputs.module';
import { TagListComponent } from '@platform/shared/components/tag-list/tag-list.component';
import { ExpertAvailabilityComponent } from '@platform/features/dashboard/components/expert-availability/expert-availablitiy.component';
import { SettingOptionComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/setting-option/setting-option.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommunicatorModule.forRoot(CommunicatorConfigFactory, Config.communicator.reconnectTimeout),
    NgbModule,
    TranslateModule.forChild(),
    AnymindComponentsModule,
    RouterModule,
    UserAvatarModule,
    IconModule,
    ButtonModule,
    InputsModule,
  ],
  declarations: [
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    DropdownPrimaryDirective,
    RadioButtonDirective,
    WidgetGeneratorComponent,
    ContentHeightAnimateDirective,
    PreloaderContainerComponent,
    ConsultationTagsComponent,
    ConsultationPriceComponent,
    InputTagsComponent,
    DropdownListComponent,
    ScrollToElementDirective,
    DropdownComponent,
    ToggleElementDirective,
    ValidationDirective,
    ExpandablePanelComponent,
    ExpertAvailabilityComponent,
    TagListComponent,
    SettingOptionComponent,
  ],
  entryComponents: [WidgetGeneratorComponent],
  exports: [
    AnymindComponentsModule,
    TranslateModule,
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    ContentHeightAnimateDirective,
    PreloaderContainerComponent,
    ConsultationTagsComponent,
    ConsultationPriceComponent,
    InputTagsComponent,
    DropdownListComponent,
    DropdownComponent,
    ValidationDirective,
    ExpandablePanelComponent,
    ExpertAvailabilityComponent,
    ToggleElementDirective,
    TagListComponent,
    SettingOptionComponent,
  ],
  providers: [
    EventsServiceProvider,
    CommunicatorService,
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
    ProfileLinksComponentService,
    PhoneNumberUnifyService,
  ],
})
export class SharedModule {}
