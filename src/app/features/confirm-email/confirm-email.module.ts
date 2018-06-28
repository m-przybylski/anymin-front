// tslint:disable:no-empty
import { NgModule } from '@angular/core';
import { ConfirmEmailComponent } from './confirm-email.component';
import { ConfirmEmailGuard } from './confirm-email.guard';
import { LoginConfirmEmailResolverProvider }
  from '../../shared/providers/ajs-upgraded-providers/ajs-upgraded-providers';
import { ConfirmEmailRoutingModule } from './confirm-email.routing.module';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';

@NgModule({
  declarations: [
    ConfirmEmailComponent
  ],
  providers: [
    LoginConfirmEmailResolverProvider,
    ConfirmEmailGuard
  ],
  imports: [
    ConfirmEmailRoutingModule,
    AngularJsProvidersModule
  ]
})
export class ConfirmEmailModule {

  constructor() {
  }
}
