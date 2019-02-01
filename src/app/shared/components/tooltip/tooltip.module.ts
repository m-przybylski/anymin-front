import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '@platform/shared/components/tooltip/tooltip.component';
import { TooltipDirective } from '@platform/shared/components/tooltip/tooltip.directive';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '@platform/shared/components/atomic-components';
import { TooltipContentComponent } from './tooltip-content/tooltip-content.component';
import { TooltipContentPositionDirective } from '@platform/shared/components/tooltip/tooltip-content/tooltip-position.directive';
import { TooltipService } from '@platform/shared/components/tooltip/tooltip.service';

@NgModule({
  imports: [CommonModule, TranslateModule, IconModule],
  declarations: [TooltipComponent, TooltipDirective, TooltipContentComponent, TooltipContentPositionDirective],
  exports: [TooltipComponent, TooltipDirective],
  entryComponents: [TooltipContentComponent],
  providers: [TooltipService],
})
export class TooltipModule {}
