import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account.routing.module';
import { SetEmailViewGuard } from './views/set-email/set-email.view.guard';
import { SetPasswordViewGuard } from './views/set-password/set-password.view.guard';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { AccountIdResolver } from './views/account.resolver';
import { SetPasswordViewComponent } from './views/set-password/set-password.view.component';
import { SetEmailViewComponent } from './views/set-email/set-email.view.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, AccountRoutingModule, SharedModule, TranslateModule, InputsModule],
  providers: [AccountIdResolver, SetEmailViewGuard, SetPasswordViewGuard],
  declarations: [SetPasswordViewComponent, SetEmailViewComponent],
})
export class AccountModule {}
