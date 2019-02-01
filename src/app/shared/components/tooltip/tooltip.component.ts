import { Component, Input, OnDestroy } from '@angular/core';
import { TooltipContentComponent } from '@platform/shared/components/tooltip/tooltip-content/tooltip-content.component';
import { TooltipInjectorService } from '@platform/shared/components/tooltip/tooltip-injector.service';
import { TooltipService } from '@platform/shared/components/tooltip/tooltip.service';

export enum TooltipComponentDestinationEnum {
  COMPONENT,
  MODAL,
  BODY,
}

@Component({
  selector: 'plat-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass'],
  providers: [TooltipInjectorService, TooltipService],
})
export class TooltipComponent implements OnDestroy {
  @Input()
  public iconClass = 'questionmark';

  @Input()
  public tooltipText: string;

  @Input()
  public tooltipType: TooltipComponentDestinationEnum = TooltipComponentDestinationEnum.BODY;

  public isVisible = false;

  constructor(private domService: TooltipInjectorService) {}

  public toggleTooltip = (isVisible: boolean): void => {
    this.isVisible = isVisible;
    if (this.isVisible) {
      this.domService.appendComponentToBody(TooltipContentComponent, this.tooltipText, this.tooltipType);
    } else {
      this.domService.removeComponentFromBody();
    }
  };

  public ngOnDestroy(): void {
    this.domService.removeComponentFromBody();
  }
}
