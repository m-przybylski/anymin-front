// tslint:disable:readonly-array
// tslint:disable:max-file-line-count
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import {
  ActiveSessionDeviceTypeEnum, IActiveSession,
  ManageSessionsViewComponentService
} from './manage-sessions.view.component.service';
import { SessionService } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

describe('Service: ManageSessionsViewComponentService', () => {

  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ManageSessionsViewComponentService,
        {
          provide: SessionService,
          useValue: createSpyObj('SessionService', ['getSessionsRoute', 'logoutRoute'])
        },
        {
          provide: AlertService,
          useValue: createSpyObj('AlertService', ['pushDangerAlert', 'pushSuccessAlert'])
        },
        {
          provide: NgbActiveModal,
          useValue: createSpyObj('NgbActiveModal', ['close'])
        },
        {
          provide: UserSessionService,
          useValue: createSpyObj('UserSessionService', ['getSession', 'logout'])
        },
        {
          provide: Router,
          useValue: createSpyObj('Router', ['navigate'])
        },
        {
          provide: LoggerFactory,
          useValue: createSpyObj('LoggerFactory', ['createLoggerService'])
        },
      ]
    });
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
    TestBed.get(UserSessionService).getSession.and.returnValue(Promise.resolve({}));
  }));

  it('should get active sessions with session on desktop device', () => {
    const mockSessionService = TestBed.get(SessionService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.getSessionsRoute.and.returnValue(of([{
      accountId: 'id',
      apiKey: 'apiKey',
      userAgent: 'Chrome, Mac OS X 10, Other',
      ipAddress: '0.0.0.0',
      city: 'NY',
      isExpired: false,
      lastActivityAt: new Date()
    }]));

    manageSessionsService.getActiveSessions()
      .subscribe((activeSessions: IActiveSession[]) => {
        expect(activeSessions[0]).toEqual({
          device: ActiveSessionDeviceTypeEnum.DESKTOP,
          isCurrentSession: false,
          details: 'Mac OS X 10 - Chrome, NY',
          apiKey: 'apiKey'
        });
      });
  });

  it('should get active sessions with session on mobile device', () => {
    const mockSessionService = TestBed.get(SessionService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.getSessionsRoute.and.returnValue(of([{
      accountId: 'id',
      apiKey: 'apiKey',
      userAgent: 'Chrome, Android, Other',
      ipAddress: '0.0.0.0',
      city: 'NY',
      isExpired: false,
      lastActivityAt: new Date()
    }]));

    manageSessionsService.getActiveSessions()
      .subscribe((activeSessions: IActiveSession[]) => {
        expect(activeSessions[0]).toEqual({
          device: ActiveSessionDeviceTypeEnum.MOBILE,
          isCurrentSession: false,
          details: 'Android - Chrome, NY',
          apiKey: 'apiKey'
        });
      });
  });

  it('should get active sessions with session on mobile device with device name and without city name', () => {
    const mockSessionService = TestBed.get(SessionService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.getSessionsRoute.and.returnValue(of([{
      accountId: 'id',
      apiKey: 'apiKey',
      userAgent: 'Chrome, Android, SuperPhone',
      ipAddress: '0.0.0.0',
      isExpired: false,
      lastActivityAt: new Date()
    }]));

    manageSessionsService.getActiveSessions()
      .subscribe((activeSessions: IActiveSession[]) => {
        expect(activeSessions[0]).toEqual({
          device: ActiveSessionDeviceTypeEnum.MOBILE,
          isCurrentSession: false,
          details: 'SuperPhone - Chrome',
          apiKey: 'apiKey'
        });
      });
  });

  it('should get active sessions with session on unknown device', () => {
    const mockSessionService = TestBed.get(SessionService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.getSessionsRoute.and.returnValue(of([{
      accountId: 'id',
      apiKey: 'apiKey',
      userAgent: 'Chrome, unknown, Other',
      ipAddress: '0.0.0.0',
      city: 'NY',
      isExpired: false,
      lastActivityAt: new Date()
    }]));

    manageSessionsService.getActiveSessions()
      .subscribe((activeSessions: IActiveSession[]) => {
        expect(activeSessions[0]).toEqual({
          device: ActiveSessionDeviceTypeEnum.UNKNOWN,
          isCurrentSession: false,
          details: 'unknown - Chrome, NY',
          apiKey: 'apiKey'
        });
      });
  });

  it('should get active sessions without user agent data', () => {
    const mockSessionService = TestBed.get(SessionService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.getSessionsRoute.and.returnValue(of([{
      accountId: 'id',
      apiKey: 'apiKey',
      ipAddress: '0.0.0.0',
      city: 'NY',
      isExpired: false,
      lastActivityAt: new Date()
    }]));

    manageSessionsService.getActiveSessions()
      .subscribe((activeSessions: IActiveSession[]) => {
        expect(activeSessions[0]).toEqual({
          device: ActiveSessionDeviceTypeEnum.UNKNOWN,
          isCurrentSession: false,
          details: '',
          apiKey: 'apiKey'
        });
      });
  });

  it('should show danger alert and close modal when get active sessions failed', () => {
    const mockSessionService = TestBed.get(SessionService);
    const mockAlertService = TestBed.get(AlertService);
    const activeModal = TestBed.get(NgbActiveModal);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.getSessionsRoute.and.returnValue(_throw({}));

    manageSessionsService.getActiveSessions()
      .subscribe(() => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
        expect(activeModal.close).toHaveBeenCalled();
      });
  });

  it('should logout session', () => {
    const mockSessionService = TestBed.get(SessionService);
    const mockAlertService = TestBed.get(AlertService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.logoutRoute.and.returnValue(of({}));

    manageSessionsService.logoutSession('apiKey')
      .subscribe(() => {
        expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.SessionLoggedOutSuccess);
      });
  });

  it('should show alert when logout session failed', () => {
    const mockSessionService = TestBed.get(SessionService);
    const mockAlertService = TestBed.get(AlertService);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockSessionService.logoutRoute.and.returnValue(_throw({}));

    manageSessionsService.logoutSession('apiKey')
      .subscribe(() => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      });
  });

  it('should logout current session and redirect to /login', () => {
    const mockUserSessionService = TestBed.get(UserSessionService);
    const mockAlertService = TestBed.get(AlertService);
    const mockRouter = TestBed.get(Router);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockRouter.navigate.and.returnValue(Promise.resolve({}));
    mockUserSessionService.logout.and.returnValue(Promise.resolve({}));

    manageSessionsService.logoutCurrentSession()
      .then(() => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.UserLoggedOut);
      });
  });

  it('should show danger alert when redirecting to login failed after logout', fakeAsync(() => {
    const mockUserSessionService = TestBed.get(UserSessionService);
    const mockAlertService = TestBed.get(AlertService);
    const mockRouter = TestBed.get(Router);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockRouter.navigate.and.returnValue(Promise.resolve(false));
    mockUserSessionService.logout.and.returnValue(Promise.resolve({}));

    manageSessionsService.logoutCurrentSession();
    tick();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrongWithRedirect);
  }));

  it('should show danger alert when logout current session failed', () => {
    const mockUserSessionService = TestBed.get(UserSessionService);
    const mockAlertService = TestBed.get(AlertService);
    const mockRouter = TestBed.get(Router);
    const manageSessionsService = TestBed.get(ManageSessionsViewComponentService);

    mockRouter.navigate.and.returnValue(Promise.resolve({}));
    mockUserSessionService.logout.and.returnValue(Promise.reject({}));

    manageSessionsService.logoutCurrentSession()
      .then(() => {
        expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
      });
  });

});
