import { GetSession, SessionService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { map, catchError, mergeMap, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';

export enum ActiveSessionDeviceTypeEnum {
  MOBILE,
  DESKTOP,
  UNKNOWN,
}

export interface IActiveSession {
  device: ActiveSessionDeviceTypeEnum;
  isCurrentSession: boolean;
  details: string;
  apiKey: string;
}

@Injectable()
export class ManageSessionsViewComponentService {
  private readonly deviceBrowserIndex = 0;
  private readonly deviceSystemIndex = 1;
  private readonly deviceNameIndex = 2;

  private currentSessionApiKey: string;
  private logger: LoggerService;

  constructor(
    private sessionService: SessionService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,
    private userSessionService: UserSessionService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('ManageSessionsViewComponentService');
    getNotUndefinedSession(this.store)
      .pipe(
        map(session => session.session.apiKey),
        take(1),
      )
      .subscribe(apiKey => {
        this.currentSessionApiKey = apiKey;
      });
  }

  public getActiveSessions = (): Observable<ReadonlyArray<IActiveSession>> =>
    this.sessionService.getSessionsRoute().pipe(
      mergeMap(this.handleActiveSessions),
      catchError(error => this.handleGetActiveSessionsError(error)),
    );

  public logoutCurrentSession(): void {
    this.userSessionService.logout();
  }

  public logoutSession = (apiKey: string): Observable<void> =>
    this.sessionService.logoutRoute(apiKey).pipe(
      map(() => {
        this.alertService.pushSuccessAlert(Alerts.SessionLoggedOutSuccess);
      }),
      catchError(this.handleLogoutSessionError),
    );

  private handleLogoutSessionError = (error: HttpErrorResponse): Observable<void> => {
    this.logger.warn('error when try to logout session', error);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

    return of();
  };

  private handleGetActiveSessionsError = (error: HttpErrorResponse): Observable<ReadonlyArray<IActiveSession>> => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('error when try to get active sessions', error);
    this.activeModal.close();

    return of();
  };

  private handleActiveSessions = (sessions: ReadonlyArray<GetSession>): Observable<ReadonlyArray<IActiveSession>> =>
    of(
      sessions.map(session => ({
        device: this.getDeviceType(session),
        isCurrentSession: this.currentSessionApiKey === session.apiKey,
        details: this.getSessionDetails(session),
        apiKey: session.apiKey,
      })),
    );

  private isDesktopDevice = (session: GetSession): boolean =>
    session.userAgent !== undefined &&
    (session.userAgent.includes('Win') || session.userAgent.includes('Mac') || session.userAgent.includes('Linux'));

  private isMobileDevice = (session: GetSession): boolean =>
    session.userAgent !== undefined &&
    (session.userAgent.includes('Android') ||
      session.userAgent.includes('Mobile') ||
      session.userAgent.includes('iOS') ||
      session.userAgent.includes('Windows Phone'));

  private getDeviceType = (session: GetSession): ActiveSessionDeviceTypeEnum => {
    if (this.isDesktopDevice(session)) {
      return ActiveSessionDeviceTypeEnum.DESKTOP;
    } else if (this.isMobileDevice(session)) {
      return ActiveSessionDeviceTypeEnum.MOBILE;
    } else {
      return ActiveSessionDeviceTypeEnum.UNKNOWN;
    }
  };

  private getSessionDetails = (session: GetSession): string => {
    if (session.userAgent !== undefined) {
      const sessionDetails = session.userAgent.split(',').map(word => word.trim());
      const deviceName =
        sessionDetails[this.deviceNameIndex] === 'Other'
          ? sessionDetails[this.deviceSystemIndex]
          : sessionDetails[this.deviceNameIndex];
      const city = session.city === undefined ? '' : `, ${session.city}`;

      return `${deviceName} - ${sessionDetails[this.deviceBrowserIndex]}${city}`;
    }

    return '';
  };
}
