import { Injectable } from '@angular/core';
import { Observable, Subject, fromEvent, of, merge } from 'rxjs';
import { distinctUntilChanged, takeUntil, delay, repeat, map } from 'rxjs/operators';

export enum NavigationServiceState {
  INACTIVE,
  ACTIVE,
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly userActiveEvents: ReadonlyArray<any> = ['click', 'keydown', 'mousemove', 'scroll'];

  private readonly inactiveTimeout: number = 5000;
  private currentNavigationStateEmitter: Subject<NavigationServiceState> = new Subject<NavigationServiceState>();

  private hideMenuEvents$: Observable<any>;
  private ngUnsubscribe$: Subject<void>;

  public get userActivity$(): Subject<NavigationServiceState> {
    return this.currentNavigationStateEmitter;
  }

  public startInactivityTimer = (): void => {
    this.ngUnsubscribe$ = new Subject<void>();

    const eventStreams = this.userActiveEvents.map(el => fromEvent(document, el));

    this.hideMenuEvents$ = merge(...eventStreams).pipe(map(() => NavigationServiceState.ACTIVE));

    const timer$ = of(NavigationServiceState.INACTIVE).pipe(
      delay(this.inactiveTimeout),
      takeUntil(this.hideMenuEvents$),
      repeat(),
    );

    merge(timer$, this.hideMenuEvents$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe((val: NavigationServiceState) => {
        this.currentNavigationStateEmitter.next(val);
      });
  };

  public removeInactivityTimer = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  };
}
