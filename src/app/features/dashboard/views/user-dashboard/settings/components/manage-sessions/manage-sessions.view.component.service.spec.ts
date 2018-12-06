// tslint:disable:readonly-array
// tslint:disable:max-file-line-count
import { TestBed } from '@angular/core/testing';
import { Alerts, AlertService } from '@anymind-ng/core';
import {
  ActiveSessionDeviceTypeEnum,
  IActiveSession,
  ManageSessionsViewComponentService,
} from './manage-sessions.view.component.service';
import { SessionService } from '@anymind-ng/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger, importStore, dispatchLoggedUser } from 'testing/testing';
import { Store } from '@ngrx/store';

describe('Service: ManageSessionsViewComponentService', () => {
  let mockSessionService: SessionService;
  let manageSessionsService: ManageSessionsViewComponentService;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        ManageSessionsViewComponentService,
        {
          provide: SessionService,
          useValue: Deceiver(SessionService, {
            getSessionsRoute: jasmine.createSpy('getSessionsRoute'),
            logoutRoute: jasmine.createSpy('logoutRoute'),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jasmine.createSpy('pushDangerAlert'),
            pushSuccessAlert: jasmine.createSpy('pushSuccessAlert'),
          }),
        },
        {
          provide: NgbActiveModal,
          useValue: Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') }),
        },
        {
          provide: UserSessionService,
          useValue: Deceiver(UserSessionService, { logout: jasmine.createSpy('logout') }),
        },
        {
          provide: Router,
          useValue: Deceiver(Router, { navigate: jasmine.createSpy('navigate') }),
        },
        provideMockFactoryLogger(),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    mockSessionService = TestBed.get(SessionService);
    manageSessionsService = TestBed.get(ManageSessionsViewComponentService);
    dispatchLoggedUser(store, { session: { apiKey: 'apk' } });
  });

  it('should get active sessions with session on desktop device', () => {
    (mockSessionService.getSessionsRoute as jasmine.Spy).and.returnValue(
      of([
        {
          accountId: 'id',
          apiKey: 'apiKey',
          userAgent: 'Chrome, Mac OS X 10, Other',
          ipAddress: '0.0.0.0',
          city: 'NY',
          isExpired: false,
          lastActivityAt: new Date(),
        },
      ]),
    );

    manageSessionsService.getActiveSessions().subscribe((activeSessions: IActiveSession[]) => {
      expect(activeSessions[0]).toEqual({
        device: ActiveSessionDeviceTypeEnum.DESKTOP,
        isCurrentSession: false,
        details: 'Mac OS X 10 - Chrome, NY',
        apiKey: 'apiKey',
      });
    });
  });

  it('should get active sessions with session on mobile device', () => {
    (mockSessionService.getSessionsRoute as jasmine.Spy).and.returnValue(
      of([
        {
          accountId: 'id',
          apiKey: 'apiKey',
          userAgent: 'Chrome, Android, Other',
          ipAddress: '0.0.0.0',
          city: 'NY',
          isExpired: false,
          lastActivityAt: new Date(),
        },
      ]),
    );

    manageSessionsService.getActiveSessions().subscribe((activeSessions: IActiveSession[]) => {
      expect(activeSessions[0]).toEqual({
        device: ActiveSessionDeviceTypeEnum.MOBILE,
        isCurrentSession: false,
        details: 'Android - Chrome, NY',
        apiKey: 'apiKey',
      });
    });
  });

  it('should get active sessions with session on mobile device with device name and without city name', () => {
    (mockSessionService.getSessionsRoute as jasmine.Spy).and.returnValue(
      of([
        {
          accountId: 'id',
          apiKey: 'apiKey',
          userAgent: 'Chrome, Android, SuperPhone',
          ipAddress: '0.0.0.0',
          isExpired: false,
          lastActivityAt: new Date(),
        },
      ]),
    );

    manageSessionsService.getActiveSessions().subscribe((activeSessions: IActiveSession[]) => {
      expect(activeSessions[0]).toEqual({
        device: ActiveSessionDeviceTypeEnum.MOBILE,
        isCurrentSession: false,
        details: 'SuperPhone - Chrome',
        apiKey: 'apiKey',
      });
    });
  });

  it('should get active sessions with session on unknown device', () => {
    (mockSessionService.getSessionsRoute as jasmine.Spy).and.returnValue(
      of([
        {
          accountId: 'id',
          apiKey: 'apiKey',
          userAgent: 'Chrome, unknown, Other',
          ipAddress: '0.0.0.0',
          city: 'NY',
          isExpired: false,
          lastActivityAt: new Date(),
        },
      ]),
    );

    manageSessionsService.getActiveSessions().subscribe((activeSessions: IActiveSession[]) => {
      expect(activeSessions[0]).toEqual({
        device: ActiveSessionDeviceTypeEnum.UNKNOWN,
        isCurrentSession: false,
        details: 'unknown - Chrome, NY',
        apiKey: 'apiKey',
      });
    });
  });

  it('should get active sessions without user agent data', () => {
    (mockSessionService.getSessionsRoute as jasmine.Spy).and.returnValue(
      of([
        {
          accountId: 'id',
          apiKey: 'apiKey',
          ipAddress: '0.0.0.0',
          city: 'NY',
          isExpired: false,
          lastActivityAt: new Date(),
        },
      ]),
    );

    manageSessionsService.getActiveSessions().subscribe((activeSessions: IActiveSession[]) => {
      expect(activeSessions[0]).toEqual({
        device: ActiveSessionDeviceTypeEnum.UNKNOWN,
        isCurrentSession: false,
        details: '',
        apiKey: 'apiKey',
      });
    });
  });

  it('should show danger alert and close modal when get active sessions failed', () => {
    const mockAlertService = TestBed.get(AlertService);
    const activeModal = TestBed.get(NgbActiveModal);

    (mockSessionService.getSessionsRoute as jasmine.Spy).and.returnValue(throwError({}));

    manageSessionsService.getActiveSessions().subscribe();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should logout session', () => {
    const mockAlertService = TestBed.get(AlertService);

    (mockSessionService.logoutRoute as jasmine.Spy).and.returnValue(of({}));

    manageSessionsService.logoutSession('apiKey').subscribe(() => {
      expect(mockAlertService.pushSuccessAlert).toHaveBeenCalledWith(Alerts.SessionLoggedOutSuccess);
    });
  });

  it('should show alert when logout session failed', () => {
    const mockAlertService = TestBed.get(AlertService);
    (mockSessionService.logoutRoute as jasmine.Spy).and.returnValue(throwError({}));
    manageSessionsService.logoutSession('apiKey').subscribe();
    expect(mockAlertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
  });
});
