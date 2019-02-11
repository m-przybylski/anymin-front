import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective implements OnInit {
  public focus = false;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    if (this.focus) {
      window.setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }

  @Input()
  public set autofocus(condition: boolean) {
    this.focus = condition;
  }
}
