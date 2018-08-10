import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SetEmailViewResolver } from './views/set-email/set-email.view.resolver';
import { SetPasswordViewResolver } from './views/set-password/set-password.view.resolver';
import { SetPasswordViewComponent } from './views/set-password/set-password.view.component';
import { SetEmailViewComponent } from './views/set-email/set-email.view.component';
import { AccountRoutingModule } from './account.routing.module';
import { SetEmailViewGuard } from './views/set-email/set-email.view.guard';
import { SetPasswordViewGuard } from './views/set-password/set-password.view.guard';
import { AngularJsProvidersModule } from '../../upgrade/angularjs-providers.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    TranslateModule,
    AngularJsProvidersModule,
  ],
  providers: [SetEmailViewResolver, SetPasswordViewResolver, SetEmailViewGuard, SetPasswordViewGuard],
  declarations: [SetPasswordViewComponent, SetEmailViewComponent],
})
export class AccountModule {}
