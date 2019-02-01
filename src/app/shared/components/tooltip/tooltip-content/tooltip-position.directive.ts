import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { WindowRef } from '@anymind-ng/core';
import { ITooltipModalOffsets } from '@platform/shared/components/tooltip/tooltip.directive';
import { TooltipComponentDestinationEnum } from '@platform/shared/components/tooltip/tooltip.component';

enum TooltipPosition {
  LEFT,
  RIGHT,
  CENTER,
}

interface ITooltipContentPosition {
  offsetLeft: number;
  offsetTop: number;
}

@Directive({
  selector: '[tooltipContentPositionDirective]',
})
export class TooltipContentPositionDirective implements AfterViewInit {
  @Input()
  public contentTooltipElement: HTMLElement;

  @Input()
  public tooltipText = '';

  @Input()
  public tooltipCords: ITooltipModalOffsets;

  @Input()
  public textContent: HTMLElement;

  @Input()
  public DOMDestination: TooltipComponentDestinationEnum;

  private readonly tooltipContentMaxWidth = 280;
  private readonly mobileDevicesPadding = 12;
  private readonly halfDivider = 2;
  private isTooltipDestinationModal = false;
  private offsetPosition: ITooltipContentPosition;

  constructor(private element: ElementRef, private windowRef: WindowRef) {}

  public ngAfterViewInit(): void {
    this.checkDestination(this.DOMDestination);
  }

  private checkDestination = (type: TooltipComponentDestinationEnum): void => {
    switch (type) {
      case TooltipComponentDestinationEnum.MODAL:
        this.isTooltipDestinationModal = true;
        this.mapTooltipOffset();
        this.checkTooltipContentPosition();
        break;

      case TooltipComponentDestinationEnum.COMPONENT:
        this.isTooltipDestinationModal = true;
        this.mapTooltipOffset();
        this.setTooltipContentStyle();
        this.checkTooltipContentPosition();
        break;

      case TooltipComponentDestinationEnum.BODY:
      default:
        this.mapTooltipOffset();
        this.checkTooltipContentPosition();
    }
  };

  private mapTooltipOffset = (): void => {
    this.offsetPosition = {
      offsetLeft: this.isTooltipDestinationModal
        ? this.tooltipCords.modalRelative.offsetLeft
        : this.tooltipCords.bodyRelative.left,
      offsetTop: this.isTooltipDestinationModal
        ? this.tooltipCords.modalRelative.offsetTop
        : this.tooltipCords.bodyRelative.top,
    };
  };

  private setTooltipContentStyle = (): void => {
    this.textContent.style.whiteSpace = 'pre';
    this.textContent.style.position = 'absolute';

    this.contentTooltipElement.classList.add('tooltip-content--component');

    if (this.textContent.offsetWidth >= this.tooltipContentMaxWidth) {
      this.contentTooltipElement.style.minWidth = `${this.tooltipContentMaxWidth}px`;
      this.textContent.style.position = 'static';
      this.textContent.style.whiteSpace = 'normal';
    } else {
      const paddingElement = Number(
        this.windowRef.nativeWindow.getComputedStyle(this.contentTooltipElement).paddingLeft.replace('px', ''),
      );
      this.contentTooltipElement.style.width = `${this.textContent.offsetWidth + paddingElement * this.halfDivider}px`;
      this.textContent.style.position = 'static';
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
        this.contentTooltipElement.classList.add('tooltip-content--left');
        this.setOffsetLeftPosition();
        this.setOffsetYPosition();
        break;

      case TooltipPosition.RIGHT:
        this.contentTooltipElement.classList.add('tooltip-content--right');
        this.setOffsetRightPosition();
        this.setOffsetYPosition();
        break;

      default:
        this.contentTooltipElement.classList.add('tooltip-content--center');
        this.setCenterPosition();
        this.setOffsetYPosition();
    }
  };

  private setOffsetLeftPosition = (): void => {
    this.setTooltipPositionLeftStyle(`${this.offsetPosition.offsetLeft - this.contentTooltipElement.clientWidth}px`);
  };

  private setOffsetRightPosition = (): void => {
    this.setTooltipPositionLeftStyle(`${this.offsetPosition.offsetLeft}px`);
  };

  private setCenterPosition = (): void => {
    const contentTooltipViewPortOffset = this.contentTooltipElement.getBoundingClientRect();
    const contentTooltipOffsetLeft = Number(contentTooltipViewPortOffset.left.toFixed(0));
    this.setTooltipPositionLeftStyle(`-${contentTooltipOffsetLeft - this.mobileDevicesPadding}px`);
  };

  private setOffsetYPosition = (): void => {
    const contentHeight = this.element.nativeElement.clientHeight;
    this.setTooltipPositionTopStyle(`${this.offsetPosition.offsetTop - contentHeight}px`);
  };

  private setTooltipPositionLeftStyle = (positionLeft: string): void => {
    this.contentTooltipElement.style.left = positionLeft;
  };

  private setTooltipPositionTopStyle = (positionTop: string): void => {
    this.contentTooltipElement.style.top = positionTop;
  };

  private isFreeSpaceRightEnough = (): boolean =>
    this.windowRef.nativeWindow.innerWidth >
    this.tooltipCords.bodyRelative.left + this.contentTooltipElement.clientWidth;

  private isFreeSpaceLeftEnough = (): boolean =>
    this.tooltipCords.bodyRelative.left > this.contentTooltipElement.clientWidth;
}
