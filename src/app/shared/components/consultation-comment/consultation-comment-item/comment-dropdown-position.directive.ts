import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[commentDropdownPosition]',
})
export class CommentDropdownPositionDirective {
  @Input()
  public commentDropdownParentElement: HTMLElement;

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (this.isElementClicked(event)) {
      const dropdownElement = this.element.nativeElement.lastElementChild;

      if (this.commentDropdownParentElement.offsetHeight > dropdownElement.clientHeight) {
        dropdownElement.style.top = '100%';
        dropdownElement.style.bottom = 'unset';

        return;
      }
      dropdownElement.style.bottom = '100%';
      dropdownElement.style.top = 'unset';
    }
  }

  private isElementClicked = (event: Event): boolean => this.element.nativeElement.contains(event.target);
}
