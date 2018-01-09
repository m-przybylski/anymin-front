import { NgModule } from '@angular/core';
import { SessionService } from './services/session/session.service';
import { SessionApi } from 'profitelo-api-ng4/api/api';

@NgModule({
  providers: [
    SessionService,
    SessionApi
  ]
})

export class CoreModule {

}
