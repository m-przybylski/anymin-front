import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { keyboardCodes } from '../../../../../../angularjs/common/classes/keyboard';

@Directive({
  selector: '[scrollToElementDirective]',
})
export class ScrollToElementDirective {
  @Output() public onEnter = new EventEmitter(true);

  @Output() public onKeyUp = new EventEmitter(true);

  @Output() public onKeyDown = new EventEmitter(true);

  constructor(private element: ElementRef) {}

  @HostListener('document:keydown', ['$event'])
  public onKeydownHandler = (event: KeyboardEvent): void => {
    switch (event.keyCode) {
      case keyboardCodes.arrowUp:
        this.onKeyUp.emit();

        return;

      case keyboardCodes.arrowDown:
        this.onKeyDown.emit();

        return;

      case keyboardCodes.enter:
        this.onEnter.emit();

        return;

      default:
        return;
    }
  };

  public scrollToElement = (index: number): void =>
    this.element.nativeElement
      .querySelector(`#item_${index}`)
      .scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}
