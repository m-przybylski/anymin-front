import { NgModule } from '@angular/core';
import { EventsServiceProvider } from '../shared/providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { UserSessionService } from './services/user-session/user-session.service';
import { ApiModule } from '@anymind-ng/api';
import { ApiConfigurationFactory } from './factories/api-configuration/api-configuration.factory';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ApiKeyService} from './services/api-key/api-key.service';
import {ApiKeyInterceptor} from './services/api-key/api-key.interceptor';

@NgModule({
  imports: [
    ApiModule.forRoot(ApiConfigurationFactory)
  ],
  providers: [
    ApiKeyService,
    EventsServiceProvider,
    UserSessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

}
