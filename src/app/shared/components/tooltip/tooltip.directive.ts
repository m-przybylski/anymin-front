import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { WindowRef } from '@anymind-ng/core';

enum TooltipPosition {
  LEFT,
  RIGHT,
  CENTER,
}

interface ITooltipPosition {
  offsetLeft: number;
  offsetTop: number;
}

@Directive({
  selector: '[tooltipPositionDirective]',
})
export class TooltipDirective {
  @Output()
  public onClick = new EventEmitter<boolean>();

  @Input()
  public tooltipText: string;

  @Input()
  public textContent: HTMLElement;

  @Input()
  public contentTooltipElement: HTMLElement;

  private readonly tooltipContentMaxWidth = 280;
  private readonly mobileDevicesPadding = 12;
  private readonly halfDivider = 2;

  private tooltipPosition: ITooltipPosition;
  private horizontalPadding: number;
  private isVisible = false;

  constructor(private element: ElementRef, private windowRef: WindowRef) {}

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    this.isVisible = this.element.nativeElement.contains(event.target);
    this.onClick.emit(this.isVisible);
  }

  @HostListener('click', ['$event'])
  public onClickEvent = (event: HTMLSelectElement): void => {
    if (!this.isVisible) {
      this.resetTooltipValues();

      this.horizontalPadding = this.getTooltipContentPadding();

      if (this.isTextLong()) {
        this.textContent.style.whiteSpace = 'normal';
        this.contentTooltipElement.style.width = `${this.tooltipContentMaxWidth}px`;
      }
      this.setTooltipPosition(event);
      this.checkTooltipContentPosition();
    }
  };

  private checkTooltipContentPosition = (): void => {
    if (this.isFreeSpaceLeftEnough()) {
      this.setTooltipContentPosition(TooltipPosition.LEFT);
    } else if (this.isFreeSpaceRightEnough()) {
      this.setTooltipContentPosition(TooltipPosition.RIGHT);
    } else {
      this.setTooltipContentPosition(TooltipPosition.CENTER);
    }
  };

  private setTooltipContentPosition = (position: TooltipPosition): void => {
    switch (position) {
      case TooltipPosition.LEFT:
        this.element.nativeElement.classList.add('tooltip--left');
        this.setTooltipContentOffsetY();
        break;

      case TooltipPosition.RIGHT:
        this.element.nativeElement.classList.add('tooltip--right');
        this.setTooltipContentOffsetY();
        break;

      default:
        this.element.nativeElement.classList.add('tooltip--center');
        this.setMobilePositionContentTooltip();
    }
  };

  private setMobilePositionContentTooltip = (): void => {
    const contentTooltipViewPortOffset = this.contentTooltipElement.getBoundingClientRect();
    const contentTooltipOffsetLeft = Number(contentTooltipViewPortOffset.left.toFixed(0));
    this.contentTooltipElement.style.left = `-${contentTooltipOffsetLeft - this.mobileDevicesPadding}px`;
    this.contentTooltipElement.style.bottom = `16px`;
  };

  private setTooltipContentOffsetY = (): void => {
    this.contentTooltipElement.style.bottom = `8px`;
  };

  private setTooltipPosition = (event: HTMLSelectElement): void => {
    this.tooltipPosition = {
      offsetLeft: event.pageX,
      offsetTop: event.pageY,
    };
  };

  private isFreeSpaceRightEnough = (): boolean =>
    this.windowRef.nativeWindow.innerWidth > this.tooltipPosition.offsetLeft + this.contentTooltipElement.clientWidth;

  private isFreeSpaceLeftEnough = (): boolean =>
    this.tooltipPosition.offsetLeft > this.contentTooltipElement.clientWidth;

  private isTextLong = (): boolean =>
    this.textContent.clientWidth + this.horizontalPadding * this.halfDivider > this.tooltipContentMaxWidth;

  private getTooltipContentPadding = (): number =>
    Number(this.windowRef.nativeWindow.getComputedStyle(this.contentTooltipElement).paddingLeft.replace('px', ''));

  private resetTooltipValues = (): void => {
    this.element.nativeElement.classList.remove('tooltip--center');
    this.element.nativeElement.classList.remove('tooltip--right');
    this.element.nativeElement.classList.remove('tooltip--left');
    this.contentTooltipElement.style.left = '0px';
  };
}
