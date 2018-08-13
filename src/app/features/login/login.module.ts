// tslint:disable:no-empty
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberViewComponent } from './views/phone-number/phone-number.view.component';
import { LoginRoutingModule } from './login.routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PhoneNumberViewService } from './views/phone-number/phone-number.view.service';
import { PasswordViewComponent } from './views/password/password.view.component';
import { PinCodeViewComponent } from './views/pin-code/pin-code.view.component';
import { PasswordViewService } from './views/password/password.view.service';
import { PinCodeViewService } from './views/pin-code/pin-code.view.service';
import { PinCodeViewResolver } from './views/pin-code/pin-code.view.resolver';
import { LimitedAccessViewComponent } from './views/limited-access/limited-access.view.component';
import { BlockedViewComponent } from './views/blocked/blocked.view.component';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';

@NgModule({
  declarations: [
    PhoneNumberViewComponent,
    PasswordViewComponent,
    PinCodeViewComponent,
    LimitedAccessViewComponent,
    BlockedViewComponent
  ],
  providers: [
    PhoneNumberViewService,
    PasswordViewService,
    PinCodeViewService,
    PinCodeViewResolver
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    AngularJsProvidersModule
  ]
})
export class LoginModule {

  constructor() {
  }
}
