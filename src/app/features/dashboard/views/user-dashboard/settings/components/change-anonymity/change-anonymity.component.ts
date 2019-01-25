import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeAnonymityComponentService } from '@platform/features/dashboard/views/user-dashboard/settings/components/change-anonymity/change-anonymity.component.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';

@Component({
  selector: 'plat-change-anonymity',
  templateUrl: './change-anonymity.component.html',
  styleUrls: ['./change-anonymity.component.sass'],
  providers: [ChangeAnonymityComponentService],
})
export class ChangeAnonymityComponent implements OnDestroy, OnInit {
  public anonymityControl: FormControl;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private anonymityComponentService: ChangeAnonymityComponentService,
    private store: Store<fromCore.IState>,
  ) {
    this.anonymityControl = new FormControl();
  }

  public ngOnInit(): void {
    getNotUndefinedSession(this.store)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((session: GetSessionWithAccount) => {
        this.anonymityControl.setValue(session.account.isAnonymous);
      });
    this.anonymityControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isAnonymous => this.onAnonymityChange(isAnonymous));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onAnonymityChange(isAnonymous: boolean): void {
    this.anonymityComponentService.changeAnonymity(isAnonymous).subscribe({
      error: (): void => {
        this.anonymityControl.setValue(!isAnonymous, { emitEvent: false });
      },
    });
  }
}
