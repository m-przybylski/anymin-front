import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Directive({
  selector: '[platInputSearchClick]',
})
export class InputSearchClickDirective {
  @Input()
  public set isUserMenuVisible(value: boolean) {
    if (value) {
      this.setCloseHandlers();

      return;
    }
  }

  @Output()
  public toggleElement = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private element: ElementRef) {}

  private setCloseHandlers(): void {
    fromEvent<MouseEvent>(this.document, 'click')
      .pipe(
        filter(event => !this.element.nativeElement.contains(event.target)),
        take(1),
      )
      .subscribe(() => {
        this.toggleElement.emit(false);
      });
  }
}
