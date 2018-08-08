// tslint:disable:no-let
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';

@Injectable()
export class NavbarMenuService {
  private logger: LoggerService;
  private initialMenuVisibility = false;
  private visibility$ = new BehaviorSubject<boolean>(this.initialMenuVisibility);

  constructor(
    private userSessionService: UserSessionService,
    private loggerFactory: LoggerFactory,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.logger = this.loggerFactory.createLoggerService('NavbarMenuService');
  }

  public getVisibility$ = (): BehaviorSubject<boolean> => this.visibility$;

  public hasUserExpertProfile = (): boolean => {
    let isExpert = false;
    this.userSessionService.getSession().then(
      session => {
        isExpert = session.isExpert;
      },
      () => {
        this.logger.warn('failure when try to get session');
      },
    );

    return isExpert;
  };

  public hasUserCompanyProfile = (): boolean => {
    let isCompany = false;
    this.userSessionService
      .getSession()
      .then(session => {
        isCompany = session.isCompany;
      })
      .catch(err => {
        this.logger.warn('failure when try to get session', err);
      });

    return isCompany;
  };

  public logout = (): void => {
    this.userSessionService.logout().then(
      () => {
        this.router
          .navigate(['/login'])
          .then(isRedirectSuccessful => {
            if (!isRedirectSuccessful) {
              this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
              this.logger.warn('Error when redirect to /login');
            }
          })
          .catch(this.logger.error.bind(this));
        this.alertService.pushSuccessAlert(Alerts.UserLoggedOut);
      },
      () => {
        this.logger.log('handle logout failure');
      },
    );
  };
}
