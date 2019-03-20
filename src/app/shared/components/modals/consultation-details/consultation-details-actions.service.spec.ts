// tslint:disable:readonly-array
// tslint:disable:max-file-line-count

import { Deceiver } from 'deceiver-core';
import { EmploymentService, PresenceService } from '@anymind-ng/api';
import { AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthActions } from '@platform/core/actions';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { ConsultationDetailsActionsService } from './consultation-details-actions.service';
import { Injector } from '@angular/core';
import { CreateCallService } from '@platform/shared/services/client-call/create-call.service';
import { CallStatusService } from '@platform/shared/components/modals/consultation-details/call-status.service';
import { ConsultationDetailActions } from './actions';
import { Router } from '@angular/router';

describe('ConsultationDetailsActionsService', () => {
  let consultationDetailsActionsService: ConsultationDetailsActionsService;
  let store: Store<fromCore.IState>;

  const presenceService: PresenceService = Deceiver(PresenceService);
  const employmentService: EmploymentService = Deceiver(EmploymentService);
  const alertService: AlertService = Deceiver(AlertService);
  const confirmationService: ConfirmationService = Deceiver(ConfirmationService);
  const router: Router = Deceiver(Router);
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jest.fn().mockReturnValue(Deceiver(LoggerService)),
  });
  const dummyInputObject = {
    expertId: '',
    modal: undefined,
    employmentId: '',
    serviceId: '',
    defaultPaymentMethod: {},
  };
  let modalService: NgbModal;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          core: combineReducers(fromCore.reducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    modalService = Deceiver(NgbModal, {
      open: jest.fn(() => ({
        result: Promise.resolve(),
      })),
    });

    consultationDetailsActionsService = new ConsultationDetailsActionsService(
      employmentService,
      alertService,
      store,
      confirmationService,
      modalService,
      TestBed.get(Injector),
      Deceiver(CreateCallService),
      Deceiver(CallStatusService),
      presenceService,
      router,
      loggerFactory,
    );
  });

  it('should be created', () => {
    expect(consultationDetailsActionsService).toBeTruthy();
  });

  describe('edit consultation', () => {
    const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
    it('should not dispatch any action on modal dismiss', fakeAsync(() => {
      const spy = jest.spyOn(store, 'dispatch');
      consultationDetailsActionsService.editConsultation({
        modal,
        serviceId: 'fake serviceId',
        defaultPaymentMethod: {},
        createEditConsultationPayload: 'fake Payload' as any,
      });
      tick();
      expect(spy).not.toHaveBeenCalled();
    }));
    it('should dispatch action returned by modal', fakeAsync(() => {
      const spy = jest.spyOn(store, 'dispatch');
      (modalService.open as jest.Mock).mockReturnValue({
        result: Promise.resolve('fake Action'),
      });
      consultationDetailsActionsService.editConsultation({
        modal,
        serviceId: 'fake serviceId',
        defaultPaymentMethod: {},
        createEditConsultationPayload: 'fake Payload' as any,
      });
      tick();
      expect(spy).toHaveBeenCalledWith('fake Action');
    }));
  });

  describe('makeCall', () => {
    const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
    it('should redirect to login when user is not logged in', fakeAsync(() => {
      // make sure user is not logged
      store.dispatch(new AuthActions.LogoutSuccessAction());
      // spy on dispatch action
      const spy = spyOn(store, 'dispatch');
      consultationDetailsActionsService.makeCall({ ...dummyInputObject, modal });
      expect(modal.close).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(new AuthActions.LoginRedirectAction());
    }));

    it('should redirect to login when user is not logged in', fakeAsync(() => {
      // make sure user is not logged
      const session = {} as any;
      store.dispatch(new AuthActions.LoginSuccessAction(session));
      // spy on dispatch action
      const spy = spyOn(store, 'dispatch');
      consultationDetailsActionsService.makeCall({ ...dummyInputObject, modal });
      expect(modal.close).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    }));
  });
  describe('leaveConsultation', () => {
    it('should not close modal when user did not confirm', fakeAsync(() => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn(() => cold('--a|', { a: false }));
      consultationDetailsActionsService.leaveConsultation({
        ...dummyInputObject,
        serviceId: 'asdf',
        modal,
        employmentId: 'aasd',
      });
      getTestScheduler().flush();
      expect(modal.close).not.toHaveBeenCalled();
    }));
    it('should close modal when user did confirm', () => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      const spy = jest.spyOn(store, 'dispatch');
      confirmationService.confirm = jest.fn().mockReturnValue(cold('--a|', { a: true }));
      employmentService.deleteEmploymentRoute = jest.fn(() => cold('-a|', { a: 'okey' }));
      alertService.pushSuccessAlert = jest.fn();
      consultationDetailsActionsService.leaveConsultation({
        ...dummyInputObject,
        modal,
        employmentId: 'aaa',
      });
      getTestScheduler().flush();
      expect(employmentService.deleteEmploymentRoute).toHaveBeenCalledWith('aaa');
      expect(spy).toHaveBeenCalledWith(new ConsultationDetailActions.ConsultationLeave('aaa'));
    });
    it('should not close modal when user confirmed but there was error on backend', () => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn(() => cold('--a|', { a: true }));
      employmentService.deleteEmploymentRoute = jest.fn(() => cold('-#', {}, 'oups'));
      alertService.pushSuccessAlert = jest.fn();
      alertService.pushDangerAlert = jest.fn();
      consultationDetailsActionsService.leaveConsultation({
        ...dummyInputObject,
        serviceId: 'asdf',
        modal,
        employmentId: 'aaa',
      });
      getTestScheduler().flush();
      expect(employmentService.deleteEmploymentRoute).toHaveBeenCalledWith('aaa');
      expect(modal.close).not.toHaveBeenCalled();
    });
  });
});
