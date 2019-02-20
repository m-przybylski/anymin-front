// tslint:disable:readonly-array
// tslint:disable:max-file-line-count

import { Deceiver } from 'deceiver-core';
import { EmploymentService, ServiceService } from '@anymind-ng/api';
import { AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromCore from '@platform/core/reducers';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthActions } from '@platform/core/actions';
import { ConfirmationService } from '@platform/shared/components/modals/confirmation/confirmation.service';
import { ConsultationDetailsActionsService } from './consultation-details-actions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';
import { CreateCallService } from '@platform/shared/services/client-call/create-call.service';
import { CallStatusService } from '@platform/shared/components/modals/consultation-details/call-status.service';

describe('ConsultationDetailsAcrionsService', () => {
  let consultationDetailsAcrionsService: ConsultationDetailsActionsService;
  let store: Store<fromCore.IState>;

  const serviceService: ServiceService = Deceiver(ServiceService);
  const employmentService: EmploymentService = Deceiver(EmploymentService);
  const alertService: AlertService = Deceiver(AlertService);
  const confirmationService: ConfirmationService = Deceiver(ConfirmationService);
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jest.fn().mockReturnValue(Deceiver(LoggerService)),
  });
  const dummyInputObject = {
    expertId: '',
    modal: undefined,
    employmentId: '',
    serviceId: '',
  };

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

    consultationDetailsAcrionsService = new ConsultationDetailsActionsService(
      serviceService,
      employmentService,
      alertService,
      store,
      confirmationService,
      Deceiver(NgbModal),
      Deceiver(Router),
      Deceiver(ActivatedRoute),
      TestBed.get(Injector),
      Deceiver(CreateCallService),
      Deceiver(CallStatusService),
      loggerFactory,
    );
  });

  it('should be created', () => {
    expect(consultationDetailsAcrionsService).toBeTruthy();
  });

  describe('makeCall', () => {
    const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
    it('should redirect to login when user is not logged in', fakeAsync(() => {
      // make sure user is not logged
      store.dispatch(new AuthActions.LogoutSuccessAction());
      // spy on dispatch action
      const spy = spyOn(store, 'dispatch');
      consultationDetailsAcrionsService.makeCall({ ...dummyInputObject, modal });
      expect(modal.close).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(new AuthActions.LoginRedirectAction());
    }));

    it('should redirect to login when user is not logged in', fakeAsync(() => {
      // make sure user is not logged
      const session = {} as any;
      store.dispatch(new AuthActions.LoginSuccessAction(session));
      // spy on dispatch action
      const spy = spyOn(store, 'dispatch');
      consultationDetailsAcrionsService.makeCall({ ...dummyInputObject, modal });
      expect(modal.close).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    }));
  });

  describe('deleteConsultation', () => {
    it('should not close modal when user did not confirm', fakeAsync(() => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn().mockReturnValue(cold('--a|', { a: false }));
      consultationDetailsAcrionsService.deleteConsultation({ ...dummyInputObject, serviceId: 'asdf', modal });
      getTestScheduler().flush();
      expect(modal.close).not.toHaveBeenCalled();
    }));
    it('should close modal when user did confirm', () => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn().mockReturnValue(cold('--a|', { a: true }));
      serviceService.deleteServiceRoute = jest.fn(() => cold('-a|', { a: 'okey' }));
      alertService.pushSuccessAlert = jest.fn();
      consultationDetailsAcrionsService.deleteConsultation({ ...dummyInputObject, serviceId: 'asdf', modal });
      getTestScheduler().flush();
      expect(serviceService.deleteServiceRoute).toHaveBeenCalledWith('asdf');
      expect(modal.close).toHaveBeenCalledWith('asdf');
    });
    it('should not close modal when user confirmed but there was error on backend', () => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn().mockReturnValue(cold('--a|', { a: true }));
      serviceService.deleteServiceRoute = jest.fn(() => cold('-#', {}, 'oups'));
      alertService.pushSuccessAlert = jest.fn();
      alertService.pushDangerAlert = jest.fn();
      consultationDetailsAcrionsService.deleteConsultation({ ...dummyInputObject, serviceId: 'asdf', modal });
      getTestScheduler().flush();
      expect(serviceService.deleteServiceRoute).toHaveBeenCalledWith('asdf');
      expect(modal.close).not.toHaveBeenCalled();
    });
  });
  describe('leaveConsultation', () => {
    it('should not close modal when user did not confirm', fakeAsync(() => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn(() => cold('--a|', { a: false }));
      consultationDetailsAcrionsService.leaveConsultation({
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
      confirmationService.confirm = jest.fn().mockReturnValue(cold('--a|', { a: true }));
      employmentService.deleteEmploymentRoute = jest.fn(() => cold('-a|', { a: 'okey' }));
      alertService.pushSuccessAlert = jest.fn();
      consultationDetailsAcrionsService.leaveConsultation({
        ...dummyInputObject,
        serviceId: 'asdf',
        modal,
        employmentId: 'aaa',
      });
      getTestScheduler().flush();
      expect(employmentService.deleteEmploymentRoute).toHaveBeenCalledWith('aaa');
      expect(modal.close).toHaveBeenCalledWith('asdf');
    });
    it('should not close modal when user confirmed but there was error on backend', () => {
      const modal = Deceiver(NgbActiveModal, { close: jest.fn() });
      confirmationService.confirm = jest.fn(() => cold('--a|', { a: true }));
      employmentService.deleteEmploymentRoute = jest.fn(() => cold('-#', {}, 'oups'));
      alertService.pushSuccessAlert = jest.fn();
      alertService.pushDangerAlert = jest.fn();
      consultationDetailsAcrionsService.leaveConsultation({
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
