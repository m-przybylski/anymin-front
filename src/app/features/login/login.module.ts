import { NgModule } from '@angular/core';
import { LoginViewComponent } from './views/login/login.view.component';
import { LoginRoutingModule } from './login.routing.module';
import { CommonModule } from '@angular/common';
import { BlockedViewComponent } from './views/blocked/blocked.view.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { LoginComponentsModule } from '@platform/shared/components/login/login-components.module';

@NgModule({
  declarations: [LoginViewComponent, BlockedViewComponent],
  imports: [CommonModule, LoginRoutingModule, AnymindComponentsModule, LoginComponentsModule],
})
export class LoginModule {}
