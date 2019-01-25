import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggerFactory } from '@anymind-ng/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { ChangeNotificationComponentService } from './change-notifications.component.service';

@Component({
  selector: 'plat-change-notifications',
  templateUrl: './change-notifications.component.html',
  styleUrls: ['./change-notifications.component.sass'],
  providers: [ChangeNotificationComponentService],
})
export class ChangeNotificationComponent extends Logger implements OnInit, OnDestroy {
  public anonymityControl: FormControl;
  private isAnonymous: boolean;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private changeNotificationComponentService: ChangeNotificationComponentService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ChangeAnonymityComponent'));
    this.getIsAnonymousFromSession();
    this.anonymityControl = new FormControl(this.isAnonymous);
  }

  public ngOnInit(): void {
    this.anonymityControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isSubscribed => this.changeNotificationSubscription(isSubscribed));

    this.changeNotificationComponentService.getNotificationSubscription().subscribe(isSubscribed => {
      this.anonymityControl.setValue(isSubscribed);
    });
  }
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public changeNotificationSubscription(isAnonymous: boolean): void {
    this.changeNotificationComponentService.changeNotificationSubscription(isAnonymous).subscribe({
      error: (): void => {
        this.anonymityControl.setValue(!isAnonymous, { emitEvent: false });
      },
    });
  }

  private getIsAnonymousFromSession(): void {
    getNotUndefinedSession(this.store)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((session: GetSessionWithAccount) => {
        this.isAnonymous = session.account.isAnonymous;
      });
  }
}
