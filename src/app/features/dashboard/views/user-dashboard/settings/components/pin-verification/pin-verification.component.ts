import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/index';
import { finalize, takeUntil, map, filter } from 'rxjs/internal/operators';
import { PinCodeTimerService } from '../../../../../../../shared/services/pin-code-timer/pin-code.timer.service';
import { PinVerificationStatus, PinVerificationComponentService } from './pin-verification.component.service';
import {
  Alerts, AlertService, FormUtilsService, InputPinCodeErrorsEnum, LoggerFactory,
  LoggerService
} from '@anymind-ng/core';

export enum PinVerificationPurposeEnum {
  PASSWORD_CHANGE,
  MSISDN_CHANGE
}

export interface IPinVerificationStatus {
  status: PinVerificationStatus;
  token: string;
}

@Component({
  selector: 'plat-pin-verification',
  templateUrl: './pin-verification.component.html',
  styleUrls: ['./pin-verification.component.sass'],
  providers: [PinVerificationComponentService]
})
export class PinVerificationComponent implements OnInit, OnDestroy {

  @Input()
  public msisdn: string;

  @Input()
  public verificationPurpose: PinVerificationPurposeEnum;

  @Output()
  public pinVerificationEmitter$: EventEmitter<IPinVerificationStatus> = new EventEmitter();

  public readonly pinVerificationFormId = 'pinVerificationForm';
  public readonly pinControlName = 'token';

  public pinVerificationForm: FormGroup;
  public isRequestPending = false;
  public timeLeft: number;

  private readonly validationAlertsMap: Map<PinVerificationStatus, string> = new Map<PinVerificationStatus, string>([
    [PinVerificationStatus.INVALID_TOKEN, InputPinCodeErrorsEnum.IncorrectPinCode],
    [PinVerificationStatus.CAN_NOT_FIND_TOKEN, InputPinCodeErrorsEnum.IncorrectPinCode],
    [PinVerificationStatus.TOO_MANY_ATTEMPTS, InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts],
    [PinVerificationStatus.TOO_MANY_ATTEMPTS, InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts],
  ]);
  private ngUnsubscribe$ = new Subject<void>();
  private logger: LoggerService;

  constructor(private pinCodeTimer: PinCodeTimerService,
              private alertService: AlertService,
              private formUtils: FormUtilsService,
              private pinVerificationComponentService: PinVerificationComponentService,
              private loggerFactory: LoggerFactory) {
  }

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
      switch (this.verificationPurpose) {
        case PinVerificationPurposeEnum.PASSWORD_CHANGE:
          this.pinVerificationComponentService.verifyResetPasswordPinToken(token, this.msisdn)
            .pipe(
              finalize(() => this.isRequestPending = false),
              map(this.handleSuccessPinTokenStatus),
              map(this.handleErrorPinTokenStatus),
              filter(status => status !== undefined)
            )
            .subscribe(this.handlePinTokenStatus);
          break;

        case PinVerificationPurposeEnum.MSISDN_CHANGE:
          this.pinVerificationComponentService.verifyChangeMsisdnPinToken(token)
            .pipe(
              finalize(() => this.isRequestPending = false),
              map(this.handleSuccessPinTokenStatus),
              map(this.handleErrorPinTokenStatus),
              filter(status => status !== undefined)
            )
            .subscribe(this.handlePinTokenStatus);
          break;

        default:
          this.handleUnhandledVerificationPurpose();
      }
    } else {
      this.formUtils.validateAllFormFields(pinVerificationForm);
    }
  }

  public isCountingDown = (): boolean => this.timeLeft > 0;

  public resendPinCode = (): void => {
    this.startPinCodeTimer();
    switch (this.verificationPurpose) {
      case PinVerificationPurposeEnum.PASSWORD_CHANGE:
        this.pinVerificationComponentService.sendNewRecoverPasswordToken(this.msisdn)
          .subscribe();
        break;

      case PinVerificationPurposeEnum.MSISDN_CHANGE:
        this.pinVerificationComponentService.sendNewChangeMsisdnToken(this.msisdn)
          .subscribe();
        break;

      default:
        this.handleUnhandledVerificationPurpose();
    }
  }

  private startPinCodeTimer = (): void => {
    this.pinCodeTimer.getTimeLeft$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(timeLeft => this.timeLeft = timeLeft);
  }

  private handleSuccessPinTokenStatus = (status: PinVerificationStatus): PinVerificationStatus | undefined => {
    if (status === PinVerificationStatus.SUCCESS) {
      this.pinVerificationEmitter$.emit({
        status: PinVerificationStatus.SUCCESS,
        token: this.pinVerificationForm.value[this.pinControlName]
      });

      return undefined;
    }

    return status;
  }

  private handleErrorPinTokenStatus = (status: PinVerificationStatus): PinVerificationStatus | undefined => {
    if (status === PinVerificationStatus.ERROR) {
      this.logger.info('handled pin verification status: ERROR');

      return undefined;
    }

    return status;
  }

  private displayValidationError = (error: string): void => {
    const errorObj = {[error]: true};
    this.pinVerificationForm.controls[this.pinControlName].setErrors(errorObj);
    this.formUtils.validateAllFormFields(this.pinVerificationForm);
  }

  private handleUnhandledStatus = (status: PinVerificationStatus): void => {
    this.logger.error('unhandled pin token status', status);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  }

  private handlePinTokenStatus = (status: PinVerificationStatus): void => {
    const errorMessage = this.validationAlertsMap.get(status);
    const fn = errorMessage ? this.displayValidationError : this.handleUnhandledStatus;
    const args = errorMessage ? errorMessage : status;
    fn.call(this, args);
  }

  private handleUnhandledVerificationPurpose = (): void => {
    this.logger.error('unhandled verificationPurpose', this.verificationPurpose);
    this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
  }

}
