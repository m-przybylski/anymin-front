// tslint:disable:prefer-template
import { AfterContentInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pinElement]',
})
export class PinElementDirective implements AfterContentInit {
  private static readonly offsetTop = 48;
  private pinElement: HTMLElement;

  @Input('pinElement')
  private pinElementClassName: string;

  constructor(private element: ElementRef) {}

  @HostListener('scroll', ['$event'])
  public onElementScroll(): void {
    if (this.element.nativeElement.scrollTop >= PinElementDirective.offsetTop) {
      this.pinElement.classList.add(this.pinElementClassName + '--fixed');
    } else {
      this.pinElement.classList.remove(this.pinElementClassName + '--fixed');
    }
  }

  public ngAfterContentInit(): void {
    this.pinElement = this.element.nativeElement.querySelector('.' + this.pinElementClassName);
  }
}
