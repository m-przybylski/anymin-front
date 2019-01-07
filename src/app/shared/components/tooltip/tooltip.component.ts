import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass'],
})
export class TooltipComponent {
  @Input()
  public tooltipText: string;

  public isVisible = false;

  public toggleTooltip = (isVisible: boolean): void => {
    this.isVisible = isVisible;
  };
}
