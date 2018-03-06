import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRegistrationSession, RegistrationService } from '@anymind-ng/api';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, InputPinCodeErrorsEnum } from '@anymind-ng/components';
import { PinCodeViewService, PinCodeServiceStatus } from './pin-code.view.service';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { PinCodeTimerService } from '../../../../shared/services/pin-code-timer/pin-code.timer.service';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './pin-code.view.html',
  styleUrls: ['./pin-code.view.component.sass'],
  providers: [PinCodeViewService]
})
export class PinCodeViewComponent implements OnInit, OnDestroy {

  public readonly pinCodeFormName = 'pinCodeForm';
  public readonly pinCodeControlName = 'pinCode';
  public readonly termsOfServiceControlName = 'termsOfService';
  public readonly termsOfMarketingControlName = 'termsOfMarketing';

  public pinCodeForm: FormGroup;
  public msisdn: string;
  public timeLeft: number;
  public isRequestPending = false;
  public isInputInitialFocused = true;
  public logger: LoggerService;
  public isUserRegisteredWithoutPassword = false;

  private registrationSession: GetRegistrationSession;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private pinCodeService: PinCodeViewService,
              private formUtils: FormUtilsService,
              private registrationService: RegistrationService,
              private alertService: AlertService,
              private pinCodeTimer: PinCodeTimerService,
              loggerFactory: LoggerFactory) {

    this.logger = loggerFactory.createLoggerService('PinCodeViewComponent');

  }

  public ngOnInit(): void {
    this.registrationSession = this.route.snapshot.data.registrationSession;

    this.logger.info('registration session', this.registrationSession);

    this.pinCodeForm = new FormGroup({});

    this.route.params.subscribe(params => {
      this.msisdn = params.msisdn;
    });

    this.route.queryParams.subscribe(params => {
      this.isUserRegisteredWithoutPassword = params.noPasswordRegistrationStatus;
    });

    this.startPinCodeTimer();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (pinCodeForm: FormGroup): void => {
    if (pinCodeForm.valid) {
      this.isRequestPending = true;
      const pinCode = pinCodeForm.value[this.pinCodeControlName];
      this.pinCodeService.handleRegistration(this.registrationSession.sessionId, pinCode)
        .pipe(finalize(() => this.isRequestPending = false))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleCheckPinCodeStatus);
    } else {
      this.formUtils.validateAllFormFields(pinCodeForm);
    }
  }

  public isCountingDown = (): boolean => this.timeLeft > 0;

  public resendPinCode = (): void => {
    this.startPinCodeTimer();
    this.registrationService.requestVerificationRoute({msisdn: this.msisdn})
      .pipe(catchError(this.handleResendPinCodeError))
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((registrationSession: GetRegistrationSession) => {
        this.registrationSession.sessionId = registrationSession.sessionId;
      });
  }

  private startPinCodeTimer = (): void => {
    this.pinCodeTimer.getTimeLeft$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(timeLeft => this.timeLeft = timeLeft);
  }

  private handleResendPinCodeError = (httpError: HttpErrorResponse): Observable<{}> => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('error when resolving pin-code', httpError);
    return of({});
  }

  // tslint:disable:cyclomatic-complexity
  private handleCheckPinCodeStatus = (status: PinCodeServiceStatus): void => {
    switch (status) {
      case PinCodeServiceStatus.SUCCESS:
        this.logger.warn('Handled backend success status');
        break;

      case PinCodeServiceStatus.INVALID:
        this.displayIncorrectPinCodeError(this.pinCodeForm, this.pinCodeControlName);
        break;

      case PinCodeServiceStatus.CAN_NOT_FIND_MSISDN_TOKEN:
        this.displayIncorrectPinCodeError(this.pinCodeForm, this.pinCodeControlName);
        break;

      case PinCodeServiceStatus.ERROR:
        this.logger.warn('Handled backend error status');
        break;

      case PinCodeServiceStatus.MSISDN_VERIFICATION_TOKEN_INCORRECT:
        this.displayIncorrectPinCodeError(this.pinCodeForm, this.pinCodeControlName);
        break;

      case PinCodeServiceStatus.TOO_MANY_MSISDN_TOKEN_ATTEMPTS:
        this.displayIncorrectTooManyAttemptsError(this.pinCodeForm, this.pinCodeControlName);
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('Unhandled backend pin code status', status);
    }
  }

  private displayIncorrectPinCodeError = (pinCodeForm: FormGroup, pinCodeControlName: string): void => {
    pinCodeForm.controls[pinCodeControlName].setErrors({[InputPinCodeErrorsEnum.IncorrectPinCode]: true});
    this.formUtils.validateAllFormFields(pinCodeForm);
  }

  private displayIncorrectTooManyAttemptsError = (pinCodeForm: FormGroup, pinCodeControlName: string): void => {
    pinCodeForm.controls[pinCodeControlName].setErrors({[InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts]: true});
    this.formUtils.validateAllFormFields(pinCodeForm);
  }

}
