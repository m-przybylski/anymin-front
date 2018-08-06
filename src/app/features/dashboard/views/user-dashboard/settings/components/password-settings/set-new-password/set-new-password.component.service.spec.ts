// tslint:disable:no-empty
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RecoverPasswordService } from '@anymind-ng/api';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { SetNewPasswordComponentService, SetNewPasswordStatusEnum } from './set-new-password.component.service';
import { BackendErrors } from '../../../../../../../../shared/models/backend-error/backend-error';

describe('Service: SetNewPasswordComponentService', () => {

  const mockPassword = 'password';
  const mockPhoneNumber = '+48555555555';
  const mockToken = 'token';
  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SetNewPasswordComponentService,
        {
          provide: RecoverPasswordService,
          useValue: createSpyObj('RecoverPasswordService', ['putRecoverPasswordMsisdnRoute'])
        },
        {provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert', 'pushSuccessAlert'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
  }));

  it('should return SUCCESS status and show success alert when set new password pass', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);
    const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

    mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.and.returnValue(of({}));

    setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword)
      .subscribe((status: SetNewPasswordStatusEnum) => {
        expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.ChangePasswordSuccess);
        expect(status).toEqual(SetNewPasswordStatusEnum.SUCCESS);
      });
    tick();
  }));

  it('should return ERROR status and show danger alert when set password failed without backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);
      const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

      mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.and.returnValue(_throw({
        error: {
          error: {}
        }
      }));

      setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword)
        .subscribe(() => {
        }, (err: SetNewPasswordStatusEnum) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(SetNewPasswordStatusEnum.ERROR);
        });
      tick();
    }));

  it('should return ERROR status and show danger alert when set password failed with unhandled backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const mockAlertService = TestBed.get(AlertService);
      const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

      mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.and.returnValue(_throw({
        error: {
          code: 1,
          error: {},
          message: 'errorMessage'
        }
      }));

      setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword)
        .subscribe(() => {
        }, (err: SetNewPasswordStatusEnum) => {
          expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
          expect(err).toEqual(SetNewPasswordStatusEnum.ERROR);
        });
      tick();
    }));

  it('should return NO_TOKEN status and show danger alert when set password failed with' +
    'CannotFindMsisdnToken backend error', fakeAsync(() => {
    const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
    const mockAlertService = TestBed.get(AlertService);
    const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

    mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.and.returnValue(_throw({
      error: {
        code: BackendErrors.CannotFindMsisdnToken,
        error: {},
        message: 'errorMessage'
      }
    }));

    setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword)
      .subscribe(() => {
      }, (err: SetNewPasswordStatusEnum) => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.CannotFindMsisdnToken);
        expect(err).toEqual(SetNewPasswordStatusEnum.NO_TOKEN);
      });
    tick();
  }));

  it('should return INVALID status alert when set password failed with IncorrectValidation backend error',
    fakeAsync(() => {
      const mockRecoverPasswordService = TestBed.get(RecoverPasswordService);
      const setNewPasswordComponentService = TestBed.get(SetNewPasswordComponentService);

      mockRecoverPasswordService.putRecoverPasswordMsisdnRoute.and.returnValue(_throw({
        error: {
          code: BackendErrors.IncorrectValidation,
          error: {},
          message: 'errorMessage'
        }
      }));

      setNewPasswordComponentService.setNewPassword(mockPhoneNumber, mockToken, mockPassword)
        .subscribe(() => {
        }, (err: SetNewPasswordStatusEnum) => {
          expect(err).toEqual(SetNewPasswordStatusEnum.INVALID);
        });
      tick();
    }));

});
