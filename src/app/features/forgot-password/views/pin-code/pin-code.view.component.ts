// tslint:disable:newline-before-return
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtilsService } from '@anymind-ng/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ForgotPasswordPinCodeViewService } from './pin-code.view.service';
import { PinCodeTimerService } from '@platform/shared/services/pin-code-timer/pin-code.timer.service';

@Component({
  templateUrl: './pin-code.view.component.html',
  providers: [ForgotPasswordPinCodeViewService],
  styleUrls: ['./pin-code.view.component.sass'],
})
export class ForgotPasswordPinCodeViewComponent implements OnInit, OnDestroy {
  public readonly pinCodeFormId = 'pinCodeForm';
  public readonly pinCodeControlName = 'pinCode';

  public pinCodeForm: FormGroup;
  public isRequestPending = false;
  public timeLeft: number;
  public isCountingDown: boolean;

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private formUtils: FormUtilsService,
    private forgotPasswordService: ForgotPasswordPinCodeViewService,
    private pinCodeTimer: PinCodeTimerService,
  ) {}

  public ngOnInit(): void {
    this.pinCodeForm = new FormGroup({});
    this.startPinCodeTimer();
  }

  public onFormSubmit(pinCodeForm: FormGroup): void {
    if (pinCodeForm.valid) {
      this.isRequestPending = true;
      this.forgotPasswordService
        .handlePinToken(pinCodeForm.controls[this.pinCodeControlName])
        .pipe(
          finalize(() => {
            this.isRequestPending = false;
          }),
        )
        .subscribe();
    } else {
      this.formUtils.validateAllFormFields(pinCodeForm);
    }
  }

  public resendPinCode(): void {
    this.startPinCodeTimer();
    this.forgotPasswordService.resendPinCode();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private startPinCodeTimer(): void {
    this.pinCodeTimer
      .getTimeLeft$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(timeLeft => {
        this.isCountingDown = timeLeft > 0;
        this.timeLeft = timeLeft;
      });
  }
}
