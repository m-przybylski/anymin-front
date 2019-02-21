import { Component, Inject, InjectionToken } from '@angular/core';
import { ITooltipModalOffsets } from '@platform/shared/components/tooltip/tooltip.directive';
import { DESCRIPTION, DOM_DESTINATION, OFFSETS } from '@platform/shared/components/tooltip/tooltip-injector.service';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip.component';
import { Animations } from '@platform/shared/animations/animations';

@Component({
  selector: 'plat-tooltip-content',
  templateUrl: './tooltip-content.component.html',
  styleUrls: ['./tooltip-content.component.sass'],
  animations: [Animations.tooltipAnimation],
})
export class TooltipContentComponent {
  constructor(
    @Inject(DESCRIPTION) public description: InjectionToken<string>,
    @Inject(DOM_DESTINATION) public DOMDestination: InjectionToken<TooltipComponentDestinationEnum>,
    @Inject(OFFSETS) public tooltipHeaderPosition: InjectionToken<ITooltipModalOffsets>,
  ) {}
}
