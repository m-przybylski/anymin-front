import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningInformationComponent } from './warning-information.component';
import { IconModule } from '@platform/shared/components/atomic-components';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [WarningInformationComponent],
  declarations: [WarningInformationComponent],
})
export class WarningInformationModule {}
