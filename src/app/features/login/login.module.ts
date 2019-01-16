import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginViewComponent } from './views/login/login.view.component';
import { LoginRoutingModule } from './login.routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginViewService } from './views/login/login.view.service';
import { BlockedViewComponent } from './views/blocked/blocked.view.component';
import { InputsModule } from '../../shared/components/inputs/inputs.module';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { IconModule } from '@platform/shared/components/atomic-components';
import { LoginComponentsModule } from '@platform/shared/components/login/login-components.module';

@NgModule({
  declarations: [LoginViewComponent, BlockedViewComponent],
  providers: [LoginViewService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    InputsModule,
    AnymindComponentsModule,
    IconModule,
    LoginComponentsModule,
  ],
})
export class LoginModule {}
