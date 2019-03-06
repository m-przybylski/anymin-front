import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { TooltipService } from '@platform/shared/components/tooltip/tooltip.service';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip-injector.service';

export interface ITooltipModalOffsets {
  modalRelative: {
    offsetLeft: number;
    offsetTop: number;
  };
  bodyRelative: ClientRect | DOMRect;
}

@Directive({
  selector: '[tooltipPositionDirective]',
})
export class TooltipDirective implements OnInit {
  @Output()
  public onClick = new EventEmitter<boolean>();

  @Input()
  public tooltipHeader: HTMLElement;

  @Input()
  public tooltipType: TooltipComponentDestinationEnum;

  private isVisible = false;
  private tooltipOffset: ITooltipModalOffsets;

  constructor(private element: ElementRef, private tooltipService: TooltipService) {}

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.isVisible = false;
      this.onClick.emit(this.isVisible);
    }
  }

  public ngOnInit(): void {
    this.handleTooltipHeader();
  }

  private handleTooltipHeader(): void {
    this.tooltipHeader.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      this.onClick.emit(this.isVisible);

      this.mapTooltipOffsetValues();
    });
  }

  private mapTooltipOffsetValues(): void {
    const tooltipBodyRelativeOffsets = this.element.nativeElement.getBoundingClientRect();

    switch (this.tooltipType) {
      case TooltipComponentDestinationEnum.COMPONENT:
        this.tooltipOffset = {
          modalRelative: {
            offsetLeft: 0,
            offsetTop: 0,
          },
          bodyRelative: tooltipBodyRelativeOffsets,
        };
        this.tooltipService.pushTooltipPosition(this.tooltipOffset);

        break;

      case TooltipComponentDestinationEnum.BODY:
      case TooltipComponentDestinationEnum.MODAL:
      default:
        this.tooltipOffset = {
          modalRelative: {
            offsetLeft: this.element.nativeElement.offsetLeft,
            offsetTop: this.element.nativeElement.offsetTop,
          },
          bodyRelative: tooltipBodyRelativeOffsets,
        };
        this.tooltipService.pushTooltipPosition(this.tooltipOffset);
    }
  }
}
