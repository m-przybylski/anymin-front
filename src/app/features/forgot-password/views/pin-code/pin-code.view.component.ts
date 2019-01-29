// tslint:disable:newline-before-return
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Alerts, AlertService, FormUtilsService, InputPinCodeErrorsEnum, LoggerService } from '@anymind-ng/core';
import { PostRecoverPassword, RecoverPasswordService } from '@anymind-ng/api';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { VerifiedCodeService } from '../../verified-code.service';
import { ForgotPasswordPinCodeViewService, ForgotPasswordPinCodeServiceStatus } from './pin-code.view.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PinCodeTimerService } from '../../../../shared/services/pin-code-timer/pin-code.timer.service';
import { LoginHelperService } from '../../../login/services/login-helper.service';
import ClientAppTypeEnum = PostRecoverPassword.ClientAppTypeEnum;

@Component({
  templateUrl: './pin-code.view.component.html',
  providers: [ForgotPasswordPinCodeViewService],
  styleUrls: ['./pin-code.view.component.sass'],
})
export class ForgotPasswordPinCodeViewComponent implements OnInit, OnDestroy {
  public readonly pinCodeFormId = 'pinCodeForm';
  public readonly pinCodeControlName = 'pinCode';

  public msisdn: string;
  public trimedMsisdn: string;
  public pinCodeForm: FormGroup;
  public isRequestPending = false;
  public timeLeft: number;
  public isInputInitialFocused = true;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private formUtils: FormUtilsService,
    private forgotPasswordService: ForgotPasswordPinCodeViewService,
    private pinCodeTimer: PinCodeTimerService,
    private recoverPasswordService: RecoverPasswordService,
    private logger: LoggerService,
    private router: Router,
    private helper: LoginHelperService,
    private alertService: AlertService,
    private tokenService: VerifiedCodeService,
  ) {}

  public ngOnInit(): void {
    this.pinCodeForm = new FormGroup({});
    this.msisdn = this.helper.addPlusToPhoneNumber(this.route.snapshot.params.msisdn);
    this.trimedMsisdn = this.helper.trimPhoneNumber(this.route.snapshot.params.msisdn);
    this.startPinCodeTimer();
  }

  public onFormSubmit = (pinCodeForm: FormGroup): void => {
    if (pinCodeForm.valid) {
      const token: string = pinCodeForm.value[this.pinCodeControlName];
      this.isRequestPending = true;
      this.forgotPasswordService
        .checkPinCode(token)
        .pipe(finalize(() => (this.isRequestPending = false)))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(status => {
          this.handleCheckPinCodeStatus(status);
          this.tokenService.setVerifiedCode(token);
        });
    } else {
      this.formUtils.validateAllFormFields(pinCodeForm);
    }
  };

  public isCountingDown = (): boolean => this.timeLeft > 0;

  public resendPinCode = (): void => {
    this.startPinCodeTimer();
    this.recoverPasswordService
      .postRecoverPasswordRoute({ msisdn: this.msisdn, clientAppType: ClientAppTypeEnum.PLATFORM })
      .pipe(catchError(this.handleResendPinCodeError))
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe();
  };

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private redirectToSetNewPassword = (): Promise<void> =>
    this.router.navigate(['/forgot-password/set-new-password', this.trimedMsisdn]).then(isRedirectSuccessful => {
      if (!isRedirectSuccessful) {
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.warn('Can not redirect to forgot-password/set-new-password');
      }
    });

  private startPinCodeTimer = (): void => {
    this.pinCodeTimer
      .getTimeLeft$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(timeLeft => (this.timeLeft = timeLeft));
  };

  private handleResendPinCodeError = (httpError: HttpErrorResponse): Observable<void> => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('ForgotPasswordComponent: error when resolving pin-code', httpError);
    return of();
  };

  // tslint:disable:cyclomatic-complexity
  private handleCheckPinCodeStatus = (status: ForgotPasswordPinCodeServiceStatus): void => {
    switch (status) {
      case ForgotPasswordPinCodeServiceStatus.VERIFICATION_TOKEN_INCORRECT:
        this.displayIncorrectPinCodeError(this.pinCodeForm, this.pinCodeControlName);
        break;
      case ForgotPasswordPinCodeServiceStatus.CAN_NOT_FIND_TOKEN:
        this.displayIncorrectPinCodeError(this.pinCodeForm, this.pinCodeControlName);
        break;
      case ForgotPasswordPinCodeServiceStatus.INVALID:
        this.displayIncorrectPinCodeError(this.pinCodeForm, this.pinCodeControlName);
        break;
      case ForgotPasswordPinCodeServiceStatus.TO_MANY_ATTEMPTS:
        this.displayIncorrectTooManyAttemptsError(this.pinCodeForm, this.pinCodeControlName);
        break;
      case ForgotPasswordPinCodeServiceStatus.ERROR:
        break;
      case ForgotPasswordPinCodeServiceStatus.SUCCESS:
        this.redirectToSetNewPassword().catch(() => {
          this.logger.warn('Can not redirect');
        });
        break;
      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('Unhandled backed error', status);
    }
  };

  private displayIncorrectPinCodeError = (pinCodeForm: FormGroup, pinCodeControlName: string): void => {
    pinCodeForm.controls[pinCodeControlName].setErrors({ [InputPinCodeErrorsEnum.IncorrectPinCode]: true });
    this.formUtils.validateAllFormFields(pinCodeForm);
  };

  private displayIncorrectTooManyAttemptsError = (pinCodeForm: FormGroup, pinCodeControlName: string): void => {
    pinCodeForm.controls[pinCodeControlName].setErrors({ [InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts]: true });
    this.formUtils.validateAllFormFields(pinCodeForm);
  };
}
