import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserSessionService } from './services/user-session/user-session.service';
import { ApiModule } from '@anymind-ng/api';
import { ApiConfigurationFactory } from './factories/api-configuration/api-configuration.factory';
import { ApiKeyInterceptor } from './services/api-key/api-key.interceptor';
import { LoggerModule, AnymindComponentsCoreModule, LogLevel, CommunicatorModule } from '@anymind-ng/core';
import { Config } from '../../config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { getCoreConfig } from './factories/core-config/core-config.factory';
import { LongPollingService } from './services/long-polling/long-polling.service';
import { MsisdnHelperService } from './services/msisdn-helper/msisdn-helper.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './effects/login.effects';
import { SessionEffects } from './effects/session.effects';
import { CommunicatorConfigFactory } from '@platform/shared/factories/communicator-config/communicator-config.factory';
import { WebSocketServiceFactory } from '@platform/core/services/websocket/websocket.factory';
import { AnymindWebsocketService } from '@platform/core/services/anymind-websocket/anymind-websocket.service';
import { CallInvitationService } from '@platform/core/services/call/call-invitation.service';
import { UserTypeEffects } from '@platform/core/effects/user-type.effects';
import { provideCommission } from './commission';
import { ClipboardService } from './services/clipboard/clipboard.service';
import { PlatMissingTranslationHandler } from './services/translations/missing-translation.hander';
import { PushNotificationService } from './services/call/push-notifications.service';
import { RemoteLogoutService } from '@platform/core/services/remote-logout/remote-logout.service';
import { CallService } from '@platform/core/services/call/call.service';
import { CallSessionService } from '@platform/core/services/call/call-session.service';
import { RegisterEffects } from '@platform/core/effects/register.effects';
import { TranslationAssetsLoader } from './services/translations/translation-loader';
import { SetNewPasswordEffects } from '@platform/core/effects/set-new-password.effects';
import { provideTranslations } from './initialize';
import { ActivitiesCounterEffects } from '@platform/core/effects/activities-counter/activities.effects';
import { VisibilityEffects } from '@platform/core/effects/visibility/visibility.effects';
import { InvitationsEffects } from '@platform/core/effects/invitations/invitations.effects';
import { UnsupportedService } from '@platform/core/services/unsupported/unsupported.service';
import { UserAgentService } from '@platform/core/services/crawler/user-agent.service';
import { URLQueryParamsService } from '@platform/core/services/search/url-query-params.service';
import { CrawlerService } from '@platform/core/services/crawler/crawler.service';

// tslint:disable-next-line:only-arrow-functions
export function getLogLevel(): LogLevel {
  return Config.logLevel;
}

@NgModule({
  imports: [
    HttpClientModule,
    AnymindComponentsCoreModule.forRoot(getCoreConfig),
    ApiModule.forRoot(ApiConfigurationFactory),
    LoggerModule.forRoot(getLogLevel),
    NgbModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslationAssetsLoader },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: PlatMissingTranslationHandler },
    }),
    CommunicatorModule.forRoot(CommunicatorConfigFactory),
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([
      LoginEffects,
      SessionEffects,
      UserTypeEffects,
      RegisterEffects,
      SetNewPasswordEffects,
      ActivitiesCounterEffects,
      VisibilityEffects,
      InvitationsEffects,
    ]),
  ],
  providers: [
    UserSessionService,
    LongPollingService,
    MsisdnHelperService,
    ClipboardService,
    CallSessionService,
    provideCommission(),
    provideTranslations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
    WebSocketServiceFactory,
    AnymindWebsocketService,
    CallInvitationService,
    PushNotificationService,
    CallService,
    RemoteLogoutService,
    UnsupportedService,
    CrawlerService,
    UserAgentService,
    URLQueryParamsService,
  ],
})
export class CoreModule {}
