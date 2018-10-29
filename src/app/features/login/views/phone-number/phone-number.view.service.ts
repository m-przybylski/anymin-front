import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService, GetRegistrationStatus } from '@anymind-ng/api';
import { LoggerFactory, Alerts, AlertService } from '@anymind-ng/core';
import { map, catchError } from 'rxjs/operators';
import { BackendErrors, isBackendError } from '../../../../shared/models/backend-error/backend-error';
import { RegistrationInvitationService } from '../../../../shared/services/registration-invitation/registration-invitation.service';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginHelperService } from '../../services/login-helper.service';
import { Logger } from '@platform/core/logger';

export enum PhoneNumberServiceStatus {
  SUCCESS,
  MSISDN_INVALID,
  ERROR,
}

@Injectable()
export class PhoneNumberViewService extends Logger {
  private prefixLength = 3;
  private navigationMap = new Map<GetRegistrationStatus.StatusEnum, IRoutingMapConfig>([
    [
      GetRegistrationStatus.StatusEnum.REGISTERED,
      {
        route: ['/login/password', this.helper.trimPhoneNumber],
      },
    ],
    [GetRegistrationStatus.StatusEnum.UNREGISTERED, { route: ['/login/pin-code', this.helper.trimPhoneNumber] }],
    [
      GetRegistrationStatus.StatusEnum.NOPASSWORD,
      {
        route: ['/login/pin-code', this.helper.trimPhoneNumber],
        command: { queryParams: { noPasswordRegistrationStatus: true } },
      },
    ],
    [GetRegistrationStatus.StatusEnum.BLOCKED, { route: ['/login/blocked'] }],
  ]);
  private alertMap = new Map<GetRegistrationStatus.StatusEnum, string>([
    [GetRegistrationStatus.StatusEnum.VERIFICATIONATTEMPTSEXCEEDED, 'ALERT.MSISDN_VERIFICATION_ATTEMPTS_EXCEEDED'],
  ]);
  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private alertService: AlertService,
    private registrationInvitationService: RegistrationInvitationService,
    private helper: LoginHelperService,
    loggerFactory: LoggerFactory,
  ) {
    super(loggerFactory.createLoggerService('PhoneNumberViewService'));
  }

  public handlePhoneNumber = (msisdn: string): Observable<PhoneNumberServiceStatus> =>
    this.registrationService.checkRegistrationStatusRoute(msisdn).pipe(
      map(status => this.handleRegistrationStatus(msisdn, status.status)),
      catchError(this.handleRegistrationStatusError),
    );

  public getPhoneNumberFromInvitation = (): string | undefined => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return this.checkIsMsisdnInvitationExist() && invitationObject && invitationObject.msisdn
      ? invitationObject.msisdn.slice(this.prefixLength)
      : undefined;
  };

  private handleRegistrationStatus = (
    msisdn: string,
    status: GetRegistrationStatus.StatusEnum | undefined,
  ): PhoneNumberServiceStatus => {
    if (status === undefined) {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

      return PhoneNumberServiceStatus.ERROR;
    }
    const redirectTo = this.navigationMap.get(status);
    if (redirectTo !== undefined) {
      this.navigateToRoute(redirectTo.route, msisdn, redirectTo.command, status);
    }

    const showAlert = this.alertMap.get(status);
    if (showAlert !== undefined) {
      this.alertService.pushDangerAlert(showAlert, { msisdn });
    }

    return PhoneNumberServiceStatus.SUCCESS;
  };

  private handleRegistrationStatusError = (err: HttpErrorResponse): Observable<PhoneNumberServiceStatus> => {
    const error = err.error;
    if (isBackendError(error)) {
      switch (error.code) {
        case BackendErrors.NotAllowedToLogin:
          this.navigateToRoute(['/login/limited-access']);

          return throwError(PhoneNumberServiceStatus.SUCCESS);

        case BackendErrors.MsisdnIsNotValid:
        case BackendErrors.IncorrectValidation:
          return throwError(PhoneNumberServiceStatus.MSISDN_INVALID);

        default:
          this.loggerService.error('Error when handling phone number', err);
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

          return throwError(PhoneNumberServiceStatus.MSISDN_INVALID);
      }
    } else {
      this.loggerService.warn('Error when handling phone number', err);
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);

      return throwError(PhoneNumberServiceStatus.ERROR);
    }
  };
  /**
   * checks if invitation exists in locale storage
   * @return boolean true if value exists false if doesnt
   */
  private checkIsMsisdnInvitationExist = (): boolean => {
    const invitationObject = this.registrationInvitationService.getInvitationObject();

    return invitationObject !== void 0 && invitationObject.msisdn !== void 0;
  };

  /**
   * navigate to selected route
   * @param route can be string or function which evaliates router param
   * @param functionParam parameter passed to function from route
   * @param command additional query param
   * @param status additional param passed to router handler
   */
  private navigateToRoute = (
    route: ReadonlyArray<string | FunctionType>,
    functionParam?: string,
    command?: ICommandParam,
    status?: GetRegistrationStatus.StatusEnum,
  ): void => {
    const mappedRoute = (route && route.map(r => (typeof r === 'function' ? r.call(this, functionParam) : r))) || [];
    this.router
      .navigate([...mappedRoute], command)
      .then(isRedirectSuccessful => {
        if (!isRedirectSuccessful) {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrongWithRedirect);
          this.loggerService.warn(`Can not redirect to ${route}`, status);
        }
      })
      .catch(this.loggerService.error.bind(this));
  };
}

interface IRoutingMapConfig {
  route: ReadonlyArray<string | FunctionType>;
  command?: ICommandParam;
}

interface ICommandParam {
  // tslint:disable-next-line:no-any
  queryParams: { [param: string]: any };
}

type FunctionType = (phoneNumber: string) => string;
