import { Component, ElementRef, Inject, Input, NgZone } from '@angular/core';
import * as NavbarActions from '@platform/core/actions/navbar.actions';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { DOCUMENT } from '@angular/common';
// tslint:disable-next-line:rxjs-no-internal
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'plat-navbar-help',
  templateUrl: './navbar-help.component.html',
  styleUrls: ['./navbar-help.component.sass'],
})
export class NavbarHelpComponent {
  @Input()
  public set isHelpMenuVisible(value: boolean) {
    this._isHelpMenuVisible = value;
    if (value) {
      this.setCloseHandlers();

      return;
    }
    this.navbarHelpMenuClose$.next();
  }

  public get isNavbarHelpMenuVisible(): boolean {
    return this._isHelpMenuVisible;
  }

  private navbarHelpMenuClose$ = new Subject<void>();
  private _isHelpMenuVisible: boolean;

  constructor(
    private element: ElementRef,
    private store: Store<fromCore.IState>,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public toggleHelpMenuVisibility(): void {
    this.store.dispatch(new NavbarActions.ToggleHelpMenuVisibility());
  }

  private setCloseHandlers(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.document as FromEventTarget<MouseEvent>, 'click')
        .pipe(
          filter(event => !this.element.nativeElement.contains(event.target)),
          takeUntil(this.navbarHelpMenuClose$),
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.toggleHelpMenuVisibility();
          });
        });
    });
  }
}
