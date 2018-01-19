import { NgModule } from '@angular/core';
import { SessionService } from './services/session/session.service';
import { SessionApi } from 'profitelo-api-ng4/api/api';
import { EventsServiceProvider } from '../shared/providers/ajs-upgraded-providers/ajs-upgraded-providers';

@NgModule({
  providers: [
    SessionService,
    SessionApi,
    EventsServiceProvider
  ]
})

export class CoreModule {

}
