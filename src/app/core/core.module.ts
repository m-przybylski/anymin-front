import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EventsServiceProvider } from '../shared/providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { UserSessionService } from './services/user-session/user-session.service';
import { ApiModule } from '@anymind-ng/api';
import { ApiConfigurationFactory } from './factories/api-configuration/api-configuration.factory';
import { ApiKeyService } from './services/api-key/api-key.service';
import { ApiKeyInterceptor } from './services/api-key/api-key.interceptor';
import { LoggerModule, AnymindComponentsCoreModule, LogLevel } from '@anymind-ng/core';
import { Config } from '../../config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { getCoreConfig } from './factories/core-config/core-config.facotry';
import { LongPollingService } from './services/long-polling/long-polling.service';
import { LoginHelperService } from '../features/login/services/login-helper.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './effects/login.effects';
import { SessionEffects } from './effects/session.effects';
import { UserTypeEffects } from '@platform/core/effects/user-type.effects';

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
    NgbModule.forRoot(),
    TranslateModule.forRoot(),
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([LoginEffects, SessionEffects, UserTypeEffects]),
  ],
  providers: [
    ApiKeyService,
    EventsServiceProvider,
    UserSessionService,
    LongPollingService,
    LoginHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
