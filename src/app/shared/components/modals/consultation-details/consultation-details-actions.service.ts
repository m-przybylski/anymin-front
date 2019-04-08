import { Injectable, Injector } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { EmploymentService, GetDefaultPaymentMethod } from '@anymind-ng/api';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, switchMap, catchError, tap, take } from 'rxjs/operators';
import { EMPTY, from, of, Observable } from 'rxjs';
import { AuthActions } from '@platform/core/actions';
import { GenerateWidgetActions } from '@platform/shared/components/modals/generate-widget/actions';
import {
  ICreateEditConsultationPayload,
  CreateEditConsultationModalComponent,
} from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation.component';
import { CONSULTATION_DETAILS } from '@platform/shared/components/modals/create-edit-consultation/create-edit-consultation';
import { CreateCallService } from '@platform/shared/services/client-call/create-call.service';
import { CallStatusService } from '@platform/shared/components/modals/consultation-details/call-status.service';
import { ConsultationDetailActions } from './actions';
import { Router } from '@angular/router';
import { RouterPaths } from '@platform/shared/routes/routes';

@Injectable()
export class ConsultationDetailsActionsService extends Logger {
  constructor(
    private employmentService: EmploymentService,
    private alertService: AlertService,
    private store: Store<fromCore.IState>,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private injector: Injector,
    private createCallService: CreateCallService,
    private callStatusService: CallStatusService,
    private router: Router,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('ConsultationDetailsActionsService'));
  }

  public editConsultation({ modal, createEditConsultationPayload }: IConsultationDetailActionParameters): void {
    const modalOptions = {
      injector: Injector.create({
        providers: [{ provide: CONSULTATION_DETAILS, useValue: createEditConsultationPayload }],
        parent: this.injector,
      }),
    };
    this.modalService
      .open(CreateEditConsultationModalComponent, modalOptions)
      .result.then((action?: ConsultationDetailActions.ConsultationDetailsActionsUnion) => {
        if (action === undefined) {
          return;
        }
        this.store.dispatch(action);
      })
      .catch(() => this.loggerService.debug('CreateEditConsultationModal closed without changes'));
    modal.close();
  }

  public leaveConsultation({ modal, employmentId }: IConsultationDetailActionParameters): void {
    if (typeof employmentId !== 'undefined') {
      this.confirmationService
        .confirm('CONSULTATION_DETAILS.LEAVE.HEADER', 'CONSULTATION_DETAILS.LEAVE.MESSAGE')
        .pipe(
          filter(confirmed => confirmed),
          switchMap(() =>
            this.employmentService.deleteEmploymentRoute(employmentId).pipe(
              tap(() => {
                this.store.dispatch(new ConsultationDetailActions.ConsultationLeave(employmentId));
              }),
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
          this.loggerService.debug('Consultation left!');
          modal.close();
        });
    }
  }

  public makeCall({
    serviceId,
    modal,
    expertId,
    employmentId,
    expertAccountId,
    defaultPaymentMethod,
    createEditConsultationPayload,
  }: IConsultationDetailActionParameters): void {
    this.redirectToLogin(modal)
      .pipe(
        // tslint:disable-next-line: cyclomatic-complexity
        switchMap(() => {
          if (
            (defaultPaymentMethod && (defaultPaymentMethod.creditCardId || defaultPaymentMethod.promoCodeId)) ||
            (createEditConsultationPayload &&
              createEditConsultationPayload.serviceDetails &&
              createEditConsultationPayload.serviceDetails.price.value === 0)
          ) {
            const id = expertId || employmentId;
            if (id && expertAccountId) {
              return from(this.createCallService.call(serviceId, id, expertAccountId));
            }
          } else {
            modal.close();
            this.router.navigate([RouterPaths.dashboard.user.payments.asPath]);
          }

          return EMPTY;
        }),
        /**
         * once there is a call to make stop listening for session change
         * this fixes FRONT-714, but not sure it does not break something.
         */
        take(1),
      )
      .subscribe(
        () => {
          this.callStatusService.pushCallStatusEvent(true);
          modal.close();
        },
        () => this.callStatusService.pushCallStatusEvent(false),
      );
  }

  public notifyUser({ modal }: IConsultationDetailActionParameters): void {
    // TODO: implement functionality
    this.redirectToLogin(modal)
      .pipe(take(1))
      .subscribe();
  }

  public share({ serviceId, modal, expertId }: IConsultationDetailActionParameters): void {
    modal.close();
    // once expert id is not provided we are not in expert screen.
    this.store.dispatch(
      new GenerateWidgetActions.StartOpenGenerateWidgetAction({ serviceId, expertId, shareLink: window.location.href }),
    );
  }

  private redirectToLogin(modal: NgbActiveModal): Observable<undefined> {
    return this.store.pipe(
      select(fromCore.getLoggedIn),
      switchMap(login => {
        if (!login.isLoggedIn) {
          this.store.dispatch(new AuthActions.LoginRedirectAction());
          modal.close();

          return EMPTY;
        }

        return of(undefined);
      }),
    );
  }
}

export interface IConsultationDetailActionParameters {
  serviceId: string;
  modal: NgbActiveModal;
  employmentId?: string;
  defaultPaymentMethod: GetDefaultPaymentMethod;
  expertId?: string;
  expertAccountId?: string;
  createEditConsultationPayload?: ICreateEditConsultationPayload;
}
