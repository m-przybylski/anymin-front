import { Component, Input } from '@angular/core';

@Component({
  selector: 'am-core-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass'],
})
export class TooltipComponent {
  @Input()
  public tooltipText: string;

  public isVisible = false;

  public toggleTooltip(): void {
    this.isVisible = !this.isVisible;
  }
}
