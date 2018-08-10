import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs/index';
import { catchError, finalize, takeUntil } from 'rxjs/internal/operators';
import { PinCodeTimerService } from '../../../../../../../../shared/services/pin-code-timer/pin-code.timer.service';
import { RecoverPasswordStatus, PinVerificationComponentService } from './pin-verification.component.service';
import { RecoverPasswordService } from '@anymind-ng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import {
  Alerts,
  AlertService,
  FormUtilsService,
  InputPinCodeErrorsEnum,
  LoggerFactory,
  LoggerService,
} from '@anymind-ng/core';

export interface IPinVerificationStatus {
  status: RecoverPasswordStatus;
  token: string;
}

@Component({
  selector: 'plat-pin-verification',
  templateUrl: './pin-verification.component.html',
  styleUrls: ['./pin-verification.component.sass'],
  providers: [PinVerificationComponentService],
})
export class PinVerificationComponent implements OnInit, OnDestroy {
  @Input() public msisdn: string;

  @Output() public pinVerificationEmitter$: EventEmitter<IPinVerificationStatus> = new EventEmitter();

  public readonly pinVerificationFormId = 'pinVerificationForm';
  public readonly pinControlName = 'token';

  public pinVerificationForm: FormGroup;
  public isRequestPending = false;
  public timeLeft: number;

  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(
    private pinCodeTimer: PinCodeTimerService,
    private recoverPasswordService: RecoverPasswordService,
    private alertService: AlertService,
    private formUtils: FormUtilsService,
    private pinVerificationComponentService: PinVerificationComponentService,
    private loggerFactory: LoggerFactory,
  ) {}

  public ngOnInit(): void {
    this.pinVerificationForm = new FormGroup({});
    this.logger = this.loggerFactory.createLoggerService('PinVerificationComponent');
    this.startPinCodeTimer();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (pinVerificationForm: FormGroup): void => {
    if (pinVerificationForm.valid) {
      const token: string = pinVerificationForm.value[this.pinControlName];
      this.isRequestPending = true;
      this.pinVerificationComponentService
        .checkPinToken(token, this.msisdn)
        .pipe(finalize(() => (this.isRequestPending = false)))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(status => {
          this.handlePinTokenStatus(status);
        });
    } else {
      this.formUtils.validateAllFormFields(pinVerificationForm);
    }
  };

  public isCountingDown = (): boolean => this.timeLeft > 0;

  public resendPinCode = (): void => {
    this.startPinCodeTimer();
    this.recoverPasswordService
      .postRecoverPasswordRoute({ msisdn: this.msisdn })
      .pipe(catchError(this.handleResendPinCodeError))
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe();
  };

  private startPinCodeTimer = (): void => {
    this.pinCodeTimer
      .getTimeLeft$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(timeLeft => (this.timeLeft = timeLeft));
  };

  private handleResendPinCodeError = (httpError: HttpErrorResponse): Observable<void> => {
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
    this.logger.warn('error when try to recover password', httpError);

    return of();
  };

  // tslint:disable:cyclomatic-complexity
  private handlePinTokenStatus = (status: RecoverPasswordStatus): void => {
    switch (status) {
      case RecoverPasswordStatus.INVALID_TOKEN:
        this.displayIncorrectPinTokenError();
        break;

      case RecoverPasswordStatus.CAN_NOT_FIND_TOKEN:
        this.displayIncorrectPinTokenError();
        break;

      case RecoverPasswordStatus.TOO_MANY_ATTEMPTS:
        this.displayIncorrectTooManyAttemptsError();
        break;

      case RecoverPasswordStatus.ERROR:
        this.logger.info('handle ERROR status');
        break;

      case RecoverPasswordStatus.SUCCESS:
        this.handleSuccessPinTokenStatus();
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('Unhandled backed error', status);
    }
  };

  private handleSuccessPinTokenStatus = (): void => {
    this.pinVerificationEmitter$.emit({
      status: RecoverPasswordStatus.SUCCESS,
      token: this.pinVerificationForm.value[this.pinControlName],
    });
  };

  private displayIncorrectPinTokenError = (): void => {
    this.pinVerificationForm.controls[this.pinControlName].setErrors({
      [InputPinCodeErrorsEnum.IncorrectPinCode]: true,
    });
    this.formUtils.validateAllFormFields(this.pinVerificationForm);
  };

  private displayIncorrectTooManyAttemptsError = (): void => {
    this.pinVerificationForm.controls[this.pinControlName].setErrors({
      [InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts]: true,
    });
    this.formUtils.validateAllFormFields(this.pinVerificationForm);
  };
}
