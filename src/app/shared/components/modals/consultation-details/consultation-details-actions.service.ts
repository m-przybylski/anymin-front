import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { ServiceService, EmploymentService } from '@anymind-ng/api';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, switchMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AuthActions } from '@platform/core/actions';
import { GenerateWidgetActions } from '@platform/shared/components/modals/generate-widget/actions';

@Injectable()
export class ConsultationDetailsActionsService extends Logger {
  constructor(
    private serviceService: ServiceService,
    private employmentService: EmploymentService,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
    private confirmationService: ConfirmationService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory);
  }

  public editConsultation = ({ serviceId, modal }: IConsultationDetailActionParameters): void => {
    modal.close(serviceId);
    // TODO: implement logic
  };
  public deleteConsultation = ({ serviceId, modal }: IConsultationDetailActionParameters): void => {
    this.confirmationService
      .confirm('CONSULTATION_DETAILS.DELETE.HEADER', 'CONSULTATION_DETAILS.DELETE.MESSAGE')
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() =>
          this.serviceService.deleteServiceRoute(serviceId).pipe(
            catchError(err => {
              this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.REMOVE_FAILURE');
              this.loggerService.warn('Cannot remove consultation', err);

              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.REMOVE_SUCCESS');
        this.loggerService.debug('Consultation removed!');
        modal.close(serviceId);
      });
  };
  public leaveConsultation = ({ serviceId, modal, employmentId }: IConsultationDetailActionParameters): void => {
    this.confirmationService
      .confirm('CONSULTATION_DETAILS.LEAVE.HEADER', 'CONSULTATION_DETAILS.LEAVE.MESSAGE')
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() =>
          this.employmentService.deleteEmploymentRoute(employmentId).pipe(
            catchError(err => {
              this.alertService.pushDangerAlert('CONSULTATION_DETAILS.ALERT.LEAVE_FAILURE');
              this.loggerService.warn('Cannot leave consultation', err);

              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe(() => {
        this.alertService.pushSuccessAlert('CONSULTATION_DETAILS.ALERT.LEAVE_SUCCESS');
        this.loggerService.debug('Consultation removed!');
        modal.close(serviceId);
      });
  };
  public makeCall = ({ modal }: IConsultationDetailActionParameters): void => {
    // check if user is logged. If not navigate to login page
    modal.close();
    this.store
      .pipe(
        select(fromCore.getLoggedIn),
        tap(login => {
          if (!login.isLoggedIn) {
            this.store.dispatch(new AuthActions.LoginRedirectAction());
          }
        }),
      )
      .subscribe();

    // TODO: implement functionality
  };
  public notifyUser = (): void => {
    // TODO: implement functionality
  };

  public share = ({ serviceId, modal, expertId }: IConsultationDetailActionParameters): void => {
    modal.close();
    this.store.dispatch(new GenerateWidgetActions.StartOpenGenerateWidgetAction({ serviceId, expertId }));
  };
}

export interface IConsultationDetailActionParameters {
  serviceId: string;
  modal: NgbActiveModal;
  employmentId: string;
  expertId: string;
}
