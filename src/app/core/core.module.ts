// tslint:disable:no-duplicate-imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EventsServiceProvider } from '../shared/providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { UserSessionService } from './services/user-session/user-session.service';
import { ApiModule } from '@anymind-ng/api';
import { ApiConfigurationFactory } from './factories/api-configuration/api-configuration.factory';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyService } from './services/api-key/api-key.service';
import { ApiKeyInterceptor } from './services/api-key/api-key.interceptor';
import { LoggerModule } from '@anymind-ng/core';
import { Config } from '../../config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AnymindComponentsCoreModule } from '@anymind-ng/core';
import { getCoreConfig } from './factories/core-config/core-config.facotry';
import { LongPollingService } from './services/long-polling/long-polling.service';

@NgModule({
  imports: [
    HttpClientModule,
    AnymindComponentsCoreModule.forRoot(getCoreConfig),
    ApiModule.forRoot(ApiConfigurationFactory),
    LoggerModule.forRoot(Config.logLevel),
    NgbModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  providers: [
    ApiKeyService,
    EventsServiceProvider,
    UserSessionService,
    LongPollingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
