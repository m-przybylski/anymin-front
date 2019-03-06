import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

enum VisibilityStatusEnum {
  VISIBLE,
  HIDDEN,
}

@Directive({
  selector: '[toggleElementDirective]',
})
export class ToggleElementDirective {
  @Output()
  public isClickedElement = new EventEmitter<boolean>();
  private isToggled = false;

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    this.setToggleStatus(this.element.nativeElement.contains(event.target));
  }

  private setToggleStatus(isClicked: boolean): void {
    const status = this.determineVisibilityStatus(isClicked);

    switch (status) {
      case VisibilityStatusEnum.VISIBLE:
        this.toggleElement(true);
        break;

      case VisibilityStatusEnum.HIDDEN:
        this.toggleElement(false);
        break;

      default:
        this.toggleElement(false);
    }
  }

  private determineVisibilityStatus(isClicked: boolean): VisibilityStatusEnum {
    if (this.isToggled) {
      return VisibilityStatusEnum.HIDDEN;
    }

    if (isClicked) {
      return VisibilityStatusEnum.VISIBLE;
    } else {
      return VisibilityStatusEnum.HIDDEN;
    }
  }

  private toggleElement(isVisible: boolean): void {
    this.isToggled = isVisible;
    this.isClickedElement.emit(isVisible);
  }
}
