import { Component, OnDestroy } from '@angular/core';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { ChangeAnonymityComponentService } from '@platform/features/dashboard/views/user-dashboard/settings/components/change-anonymity/change-anonymity.component.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil, filter } from 'rxjs/operators';
import { Logger } from '@platform/core/logger';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { GetSessionWithAccount } from '@anymind-ng/api';

@Component({
  selector: 'plat-change-anonymity',
  templateUrl: './change-anonymity.component.html',
  styleUrls: ['./change-anonymity.component.sass'],
  providers: [ChangeAnonymityComponentService],
})
export class ChangeAnonymityComponent extends Logger implements OnDestroy {
  public readonly changeAnonymityFormId = 'changeAnonymityForm';
  public readonly anonymityControlName = 'isAnonymous';

  public changeAnonymityForm: FormGroup;

  private isAnonymous: boolean;
  private ngUnsubscribe$: Subject<void> = new Subject<void>();
  private anonymityControl: FormControl;

  constructor(
    private anonymityComponentService: ChangeAnonymityComponentService,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ChangeAnonymityComponent'));
    this.getIsAnonymousFromSession();
    this.anonymityControl = new FormControl(this.isAnonymous);
    this.changeAnonymityForm = new FormGroup({
      [this.anonymityControlName]: this.anonymityControl,
    });
    this.anonymityControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(this.onAnonymityChange);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onAnonymityChange = (isAnonymous: boolean): void => {
    this.anonymityComponentService
      .changeAnonymity(isAnonymous)
      .pipe(catchError(err => this.handleChangeAnonymityError(err, isAnonymous)))
      .subscribe();
  };

  private handleChangeAnonymityError = (err: HttpErrorResponse, isAnonymous: boolean): Observable<void> => {
    this.anonymityControl.setValue(!isAnonymous, { emitEvent: false });
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.warn('error when try to change anonymity', err);

    return of();
  };

  private getIsAnonymousFromSession = (): void => {
    this.store
      .pipe(
        select(fromCore.getSession),
        filter(session => typeof session !== 'undefined'),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe((session: GetSessionWithAccount) => {
        this.isAnonymous = session.account.isAnonymous;
      });
  };
}
