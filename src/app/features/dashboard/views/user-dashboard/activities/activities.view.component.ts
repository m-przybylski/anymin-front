import { ChangeDetectionStrategy, Component, Injector, OnDestroy } from '@angular/core';
import { ActivitiesService } from '@platform/features/dashboard/views/user-dashboard/activities/activities.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { IS_EXPERT_FORM } from '@platform/shared/components/modals/profile/create-profile/create-profile.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { catchError, take, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory } from '@anymind-ng/core';
import { Logger } from '@platform/core/logger';
import { AuthActions } from '@platform/core/actions';
import {
  EditProfileModalComponent,
  MODAL_HEADER,
} from '@platform/shared/components/modals/profile/edit-profile/edit-profile.component';

@Component({
  selector: 'plat-expert-activities',
  templateUrl: './activities.view.component.html',
  styleUrls: ['./activities.view.component.sass'],
  providers: [ActivitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesViewComponent extends Logger implements OnDestroy {
  public counters: Observable<GetImportantActivitiesCounters>;
  public isExpert = false;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private activitiesService: ActivitiesService,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
    private modalService: NgbModal,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ActivitiesViewComponent'));
    this.counters = activitiesService.getCounters$;

    this.store
      .pipe(
        select(fromCore.getFirstLogin),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(isOpenFirstTime => {
        if (isOpenFirstTime) {
          const options: NgbModalOptions = {
            injector: Injector.create({
              providers: [
                { provide: IS_EXPERT_FORM, useValue: false },
                { provide: MODAL_HEADER, useValue: 'DASHBOARD.CREATE_PROFILE.TITLE' },
              ],
            }),
          };

          this.modalService.open(EditProfileModalComponent, options);
          this.store.dispatch(new AuthActions.UpdateFirstTimeLoginStatusAction());
        }
      });
  }

  public ngOnInit(): void {
    this.activitiesService
      .hasUserProfile()
      .pipe(
        catchError(error => this.handleError(error)),
        take(1),
      )
      .subscribe((isExpert: boolean) => {
        this.isExpert = isExpert;
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private handleError = (error: HttpErrorResponse): Observable<void> => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.loggerService.error('Can not open CreateProfileModalComponent after registration: ', error);

    return EMPTY;
  };
}
