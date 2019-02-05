import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Alert, AlertType, IAlertOption } from './alert';

export enum Alerts {
  SomethingWentWrong = 'ALERT.SOMETHING_WENT_WRONG',
  SomethingWentWrongWithRedirect = 'ALERT.SOMETHING_WENT_WRONG_REDIRECT',
  BadAuthenticationCredentials = 'ALERT.BAD_AUTHENTICATION_CREDENTIALS',
  NotAllowedToLogin = 'ALERT.BAD_AUTHENTICATION_CREDENTIALS',
  IncorrectValidation = 'ALERT.INCORRECT_VALID',
  CannotFindMsisdnToken = 'ALERT.NO_MSISDN_TOKEN',
  CannotFindEmailToken = 'ALERT.NO_EMAIL_TOKEN',
  PincodeSentTooRecently = 'ALERT.PINCODE_SENT_TOO_RECENTLY',
  CreateAnotherPinCodeTokenTooRecently = 'ALERT.CREATE_PINCODE_TOO_RECENTLY',
  MsisdnVerificationTokenIncorrect = 'ALERT.MSISDN_VERIFICATION_ATTEMPS_EXCEEDED',
  MsisdnBlocked = 'ALERT.MSISDN_BLOCKED',
  NoInternetConnection = 'ALERT.NO_INTERNET_CONNECTION',
  InternetConnectionBack = 'ALERT.INTERNET_CONNECTION_BACK',
  UserLoggedIn = 'ALERT.LOGGED_IN',
  UserLoggedOut = 'ALERT.LOGGED_OUT',
  ToManyAttempts = 'ALERT.TO_MANY_ATTEMPTS',
  SetPasswordViewSuccess = 'ALERT.SET_PASSWORD_VIEW.SUCCESS',
  SetEmailViewSuccess = 'ALERT.SET_EMAIL_VIEW.SUCCESS',
  CreateConsultationSuccess = 'ALERT.CREATE_CONSULTATION.SUCCESS',
  ChangePasswordSuccess = 'ALERT.CHANGE_PASSWORD_SUCCESS',
  SessionLoggedOutSuccess = 'ALERT.SESSION_LOGGED_OUT.SUCCESS',
  MsisdnChangedSuccess = 'ALERT.MSISDN_CHANGED.SUCCESS',
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private readonly alertEvent = new Subject<Alert>();
  private readonly closeAllEvent$ = new Subject<void>();

  constructor(private translate: TranslateService) {}

  public get alert$(): Observable<Alert> {
    return this.alertEvent.asObservable();
  }

  public get closeAll$(): Observable<void> {
    return this.closeAllEvent$.asObservable();
  }

  public closeAllAlerts = (): void => {
    this.closeAllEvent$.next();
  };

  public pushSuccessAlert = (
    translationKey: string,
    interpolateParams?: {},
    alertOption?: IAlertOption,
  ): Observable<void> => {
    const alert = new Alert(AlertType.SUCCESS, this.translate.instant(translationKey, interpolateParams), alertOption);

    return this.pushAlert(alert);
  };

  public pushWarningAlert = (
    translationKey: string,
    interpolateParams?: {},
    alertOption?: IAlertOption,
  ): Observable<void> => {
    const alert = new Alert(AlertType.WARNING, this.translate.instant(translationKey, interpolateParams), alertOption);

    return this.pushAlert(alert);
  };

  public pushDangerAlert = (
    translationKey: string,
    interpolateParams?: {},
    alertOption?: IAlertOption,
  ): Observable<void> => {
    const alert = new Alert(AlertType.DANGER, this.translate.instant(translationKey, interpolateParams), alertOption);

    return this.pushAlert(alert);
  };

  private pushAlert(alert: Alert): Observable<void> {
    this.alertEvent.next(alert);

    return alert.closedByUser$;
  }
}
