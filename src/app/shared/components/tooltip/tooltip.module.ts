import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '@platform/shared/components/tooltip/tooltip.component';
import { TooltipDirective } from '@platform/shared/components/tooltip/tooltip.directive';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '@platform/shared/components/atomic-components';

@NgModule({
  imports: [CommonModule, TranslateModule, IconModule],
  declarations: [TooltipComponent, TooltipDirective],
  exports: [TooltipComponent, TooltipDirective],
})
export class TooltipModule {}
