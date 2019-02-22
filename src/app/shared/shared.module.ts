import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { UnsupportedGuard } from '../features/unsupported/unsupported.guard';
import { SessionGuard } from './guards/session/session.guard';
import { AnonymousGuard } from './guards/anonymous/anonymous.guard';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
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
import { CookieNotificationModule } from '@platform/shared/components/cookie-notification/cookie-notification.module';
import { InvitationsGuard } from '@platform/features/invitations/invitations.guard';
import { InvitationsComponent } from '@platform/features/invitations/invitations.component';
import { TooltipModule } from '@platform/shared/components/tooltip/tooltip.module';
import { CopyCodeToClipboard } from '@platform/shared/components/modals/generate-widget/components/copy-generated-code/copy-generated-code.component';
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
    TooltipModule,
  ],
  declarations: [
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
    CopyCodeToClipboard,
  ],
  exports: [
    CopyCodeToClipboard,
    AnymindComponentsModule,
    CookieNotificationModule,
    TranslateModule,
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
    LocalStorageWrapperService,
    RegistrationInvitationService,
    PinCodeTimerService,
    ContentHeightAnimationService,
    PhoneNumberUnifyService,
  ],
})
export class SharedModule {}
