import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[onElementClickDirective]',
})
export class OnElementClickDirective {
  @Output() public isClickedElement = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.isClickedElement.emit(false);
    }
  }
}
