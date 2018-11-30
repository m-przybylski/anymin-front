import { NgModule } from '@angular/core';
import { WelcomeViewComponent } from './welcome.view.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@platform/shared/components/atomic-components';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { WelcomeViewGuard } from './welcome.view.guard';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    AnymindComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: WelcomeViewComponent,
      },
    ]),
  ],
  declarations: [WelcomeViewComponent],
  providers: [WelcomeViewGuard],
})
export class WelcomeModule {}
