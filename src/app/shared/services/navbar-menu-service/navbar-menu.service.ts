// tslint:disable:no-let
// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-conditional-expression
// tslint:disable:newline-before-return
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { Router } from '@angular/router';

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
        if (session.account) {
          isExpert = session.account.isExpert;
        } else {
          isExpert = false;
        }
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
        if (session.account) {
          isCompany = session.account.isCompany;
        } else {
          isCompany = false;
        }
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
