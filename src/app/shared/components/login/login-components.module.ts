import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginBackgroundComponent } from './login-background/login-background.component';
import { LoginMobileFooterComponent } from './login-mobile-footer/login-mobile-footer.component';
import { LoginContentComponent } from './login-content/login-content.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from '@platform/shared/components/tooltip/tooltip.module';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { RegistrationFormComponent } from './forms/registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';

@NgModule({
  declarations: [
    LoginBackgroundComponent,
    LoginMobileFooterComponent,
    LoginContentComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  exports: [
    LoginBackgroundComponent,
    LoginMobileFooterComponent,
    LoginContentComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    AnymindComponentsModule,
    TranslateModule,
    TooltipModule,
    ReactiveFormsModule,
    RouterModule,
    IconModule,
    ButtonModule,
  ],
})
export class LoginComponentsModule {}
