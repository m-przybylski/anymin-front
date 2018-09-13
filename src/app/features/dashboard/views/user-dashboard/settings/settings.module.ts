import { NgModule } from '@angular/core';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponentsModule } from '@platform/features/dashboard/views/user-dashboard/settings/components/settings.components.module';
import { RouterModule } from '@angular/router';
import { SettingsViewComponent } from './settings.view.component';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsViewComponent
      }
      ]),
    TranslateModule,
    AnymindComponentsModule,
    SettingsComponentsModule,
    InputsModule
  ],
  exports: [],
  providers: [],
  declarations: [SettingsViewComponent],
})

export class SettingsModule {
}
