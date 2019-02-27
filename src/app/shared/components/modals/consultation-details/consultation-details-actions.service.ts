import { Injectable, Injector } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { EmploymentService } from '@anymind-ng/api';
import { AlertService, LoggerFactory } from '@anymind-ng/core';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, switchMap, catchError, tap } from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';
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

  public leaveConsultation({ serviceId, modal, employmentId }: IConsultationDetailActionParameters): void {
    if (typeof employmentId !== 'undefined') {
      this.confirmationService
        .confirm('CONSULTATION_DETAILS.LEAVE.HEADER', 'CONSULTATION_DETAILS.LEAVE.MESSAGE')
        .pipe(
          filter(confirmed => confirmed),
          switchMap(() =>
            this.employmentService.deleteEmploymentRoute(employmentId).pipe(
              tap(() => {
                this.store.dispatch(new ConsultationDetailActions.ConsultationLeave({ serviceId, employmentId }));
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

  public makeCall({ serviceId, modal, expertId, employmentId }: IConsultationDetailActionParameters): void {
    this.store
      .pipe(
        select(fromCore.getLoggedIn),
        tap(login => {
          if (!login.isLoggedIn) {
            modal.close();
            this.store.dispatch(new AuthActions.LoginRedirectAction());
          }
        }),
        switchMap(() => {
          const id = expertId || employmentId;
          if (id) {
            return from(this.createCallService.call(serviceId, id));
          }

          return EMPTY;
        }),
      )
      .subscribe(
        () => {
          this.callStatusService.pushCallStatusEvent(true);
        },
        () => this.callStatusService.pushCallStatusEvent(false),
      );
  }

  public notifyUser(): void {
    // TODO: implement functionality
  }

  public share({ serviceId, modal, expertId }: IConsultationDetailActionParameters): void {
    modal.close();
    this.store.dispatch(new GenerateWidgetActions.StartOpenGenerateWidgetAction({ serviceId, expertId }));
  }
}

export interface IConsultationDetailActionParameters {
  serviceId: string;
  modal: NgbActiveModal;
  employmentId?: string;
  expertId?: string;
  createEditConsultationPayload?: ICreateEditConsultationPayload;
}
