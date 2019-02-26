import { Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
// tslint:disable-next-line:rxjs-no-internal
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Directive({
  selector: '[platInputSearchClick]',
})
export class InputSearchClickDirective implements OnDestroy {
  @Input()
  public set isUserMenuVisible(value: boolean) {
    if (value) {
      this.setCloseHandlers();

      return;
    }
  }

  @Output()
  public toggleElement = new EventEmitter<boolean>();

  private searchInputClicked$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: Document, private element: ElementRef) {}

  public ngOnDestroy(): void {
    this.searchInputClicked$.next();
    this.searchInputClicked$.complete();
  }

  private setCloseHandlers(): void {
    fromEvent<MouseEvent>(this.document as FromEventTarget<MouseEvent>, 'click')
      .pipe(
        filter(event => !this.element.nativeElement.contains(event.target)),
        take(1),
      )
      .subscribe(() => {
        this.toggleElement.emit(false);
      });
  }
}
