import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { SetEmailViewService, SetEmailStatus } from './set-email.view.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './set-email.view.component.html',
  styleUrls: ['./set-email.view.component.sass'],
  providers: [SetEmailViewService]
})
export class SetEmailViewComponent implements OnInit, OnDestroy {

  public readonly setEmailFormId = 'setEmailForm';
  public readonly emailControlName = 'email';

  public setEmailForm: FormGroup;
  public isRequestPending = false;
  public isInputInitialFocused = true;
  public isInputRequired = true;

  private accountId: string;
  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private setEmailService: SetEmailViewService,
              private formUtils: FormUtilsService,
              private route: ActivatedRoute,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('SetEmailViewComponent');
  }

  public ngOnInit(): void {
    this.setEmailForm = new FormGroup({});
    this.accountId = this.route.snapshot.data.accountId;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (setEmailForm: FormGroup): void => {
    if (setEmailForm.valid) {
      this.isRequestPending = true;
      const email = setEmailForm.value[this.emailControlName];

      this.setEmailService.setEmail(this.accountId, email)
        .pipe(finalize(() => this.isRequestPending = false))
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(this.handleSetEmailStatus);
    } else {
      this.formUtils.validateAllFormFields(setEmailForm);
    }
  }

  private handleSetEmailStatus = (status: SetEmailStatus): void => {
    switch (status) {
      case SetEmailStatus.INVALID:
        this.displayIncorrectEmailError();
        break;

        case SetEmailStatus.SUCCESS:
          this.logger.warn('Handled succes email status');
          break;

        case SetEmailStatus.ERROR:
          this.logger.warn('Handled error email status');
          break;

      default:
        this.logger.error('SetEmailViewComponent error when handling email status');
    }
  }

  private displayIncorrectEmailError = (): void => {
    this.setEmailForm.controls[this.emailControlName].setErrors({[SetEmailStatus.INVALID]: true});
    this.formUtils.validateAllFormFields(this.setEmailForm);
  }
}
