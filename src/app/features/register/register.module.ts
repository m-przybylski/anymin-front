import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterViewComponent } from './register.view.component';
import { SharedModule } from '@platform/shared/shared.module';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { IconModule } from '@platform/shared/components/atomic-components';
import { LoginComponentsModule } from '@platform/shared/components/login/login-components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegisterViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AnymindComponentsModule,
    InputsModule,
    IconModule,
    LoginComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterViewComponent,
      },
    ]),
  ],
})
export class RegisterModule {}
