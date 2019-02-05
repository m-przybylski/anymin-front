import { Directive, ElementRef, HostListener, Input } from '@angular/core';

interface ITooltipPosition {
  offsetLeft: number;
  offsetTop: number;
}

interface IContentTooltipDimensions {
  width: number;
  height: number;
}

@Directive({
  selector: '[tooltipPositionDetector]',
})
export class TooltipDirective {
  private static readonly minTextLengthToCreateBigTooltip = 40;

  @Input()
  public tooltipText: string;

  @Input('tooltipPositionDetector')
  private contentTooltipElementClass: string;
  private tooltipPosition: ITooltipPosition;
  private contentTooltipDimensions: IContentTooltipDimensions;
  private contentTooltipElement: HTMLElement | null | undefined;

  constructor(private element: ElementRef) {}

  @HostListener('click')
  public onClick(): void {
    this.contentTooltipElement = this.element.nativeElement.querySelector(`.${this.contentTooltipElementClass}`);

    if (this.contentTooltipElement !== null && this.contentTooltipElement !== undefined) {
      this.markTooltipAsBig();
      this.setContentTooltipSize();
      this.setElementPosition();
    }
  }

  @HostListener('window:resize')
  public onResize(): void {
    if (this.contentTooltipElement !== null && this.contentTooltipElement !== undefined) {
      this.setElementPosition();
    }
  }

  private markTooltipAsBig(): void {
    if (this.tooltipText.length > TooltipDirective.minTextLengthToCreateBigTooltip) {
      this.element.nativeElement.classList.add('tooltip--big');
    }
  }

  private setElementPosition(): void {
    this.setTooltipPosition();
    this.setTooltipContentPosition();
  }

  private setTooltipContentPosition(): void {
    if (!this.checkTooltipContentPosition()) {
      this.element.nativeElement.classList.add('tooltip--center');
      (this.contentTooltipElement as HTMLElement).style.top = `${this.tooltipPosition.offsetTop -
        this.contentTooltipDimensions.height}px`;
    } else {
      this.element.nativeElement.classList.remove('tooltip--center');
      (this.contentTooltipElement as HTMLElement).style.top = 'auto';
      (this.contentTooltipElement as HTMLElement).style.left = 'auto';
    }
  }

  private setTooltipPosition(): void {
    this.tooltipPosition = {
      offsetLeft: this.element.nativeElement.offsetLeft,
      offsetTop: this.element.nativeElement.offsetTop,
    };
  }

  private checkTooltipContentPosition(): boolean {
    return this.tooltipPosition.offsetLeft - this.contentTooltipDimensions.width > 0;
  }
  private setContentTooltipSize(): void {
    this.contentTooltipDimensions = {
      width: (this.contentTooltipElement as HTMLElement).clientWidth,
      height: (this.contentTooltipElement as HTMLElement).clientHeight,
    };
  }
}
