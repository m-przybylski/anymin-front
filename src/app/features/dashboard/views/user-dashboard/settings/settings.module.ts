import { NgModule } from '@angular/core';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponentsModule } from '@platform/features/dashboard/views/user-dashboard/settings/components/settings.components.module';
import { RouterModule } from '@angular/router';
import { SettingsViewComponent } from './settings.view.component';
import { SharedModule } from '@platform/shared/shared.module';
import { ButtonModule, IconModule } from '@platform/shared/components/atomic-components';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    InputsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsViewComponent,
      },
    ]),
    TranslateModule,
    AnymindComponentsModule,
    SettingsComponentsModule,
    ButtonModule,
    IconModule,
    ContentLoaderModule,
  ],
  exports: [],
  providers: [],
  declarations: [SettingsViewComponent],
})
export class SettingsModule {}
