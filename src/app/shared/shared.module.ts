import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { UnsupportedGuard } from '../features/unsupported/unsupported.guard';
import { SessionGuard } from './guards/session/session.guard';
import { AnonymousGuard } from './guards/anonymous/anonymous.guard';
import { TranslateModule } from '@ngx-translate/core';
import { LoginBackgroundComponent } from './components/login-background/login-background.component';
import { LoginContentComponent } from './components/login-content/login-content.component';
import { LoginMobileFooterComponent } from './components/login-mobile-footer/login-mobile-footer.component';
import { RouterModule } from '@angular/router';
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
import { ValidationDirective } from './directives/validation/validation.directive';
import { PhoneNumberUnifyService } from './services/phone-number-unify/phone-number-unify.service';
import { ExpandablePanelComponent } from './components/expandable-panel/expandable-panel.component';
import { UserAvatarModule } from './components/user-avatar/user-avatar.module';
import { IconModule, ButtonModule } from './components/atomic-components/';
import { InputsModule } from './components/inputs/inputs.module';
import { TagListComponent } from '@platform/shared/components/tag-list/tag-list.component';
import { SettingOptionComponent } from '@platform/features/dashboard/views/user-dashboard/settings/components/setting-option/setting-option.component';
import { FileUrlResolveService } from '@platform/shared/services/file-url-resolve/file-url-resolve.service';
import { CookieNotificationModule } from '@platform/shared/components/cookie-notification/cookie-notification.module';
import { InvitationsGuard } from '@platform/features/invitations/invitations.guard';
import { InvitationsComponent } from '@platform/features/invitations/invitations.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forChild(),
    AnymindComponentsModule,
    RouterModule,
    UserAvatarModule,
    IconModule,
    ButtonModule,
    InputsModule,
    CookieNotificationModule,
  ],
  declarations: [
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    ContentHeightAnimateDirective,
    PreloaderContainerComponent,
    ConsultationTagsComponent,
    ConsultationPriceComponent,
    InputTagsComponent,
    ValidationDirective,
    ExpandablePanelComponent,
    TagListComponent,
    SettingOptionComponent,
    InvitationsComponent,
  ],
  exports: [
    AnymindComponentsModule,
    CookieNotificationModule,
    TranslateModule,
    LoginBackgroundComponent,
    LoginContentComponent,
    LoginMobileFooterComponent,
    ContentHeightAnimateDirective,
    PreloaderContainerComponent,
    ConsultationTagsComponent,
    ConsultationPriceComponent,
    InputTagsComponent,
    ValidationDirective,
    ExpandablePanelComponent,
    TagListComponent,
    SettingOptionComponent,
    InvitationsComponent,
  ],
  providers: [
    UnsupportedGuard,
    AnonymousGuard,
    InvitationsGuard,
    SessionGuard,
    MsisdnGuard,
    LocalStorageWrapperService,
    RegistrationInvitationService,
    PinCodeTimerService,
    ContentHeightAnimationService,
    PhoneNumberUnifyService,
    FileUrlResolveService,
  ],
})
export class SharedModule {}
