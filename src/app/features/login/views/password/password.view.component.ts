import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PasswordLoginStatus, PasswordViewService } from './password.view.service';
import { ActivatedRoute } from '@angular/router';
import { InputPasswordErrorsEnum, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { LoginHelperService } from '../../services/login-helper.service';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './password.view.html',
  styleUrls: ['./password.view.component.sass'],
})
export class PasswordViewComponent implements OnInit {
  public readonly passwordFormId = 'passwordForm';
  public readonly passwordControlName = 'password';

  public passwordForm: FormGroup;
  public msisdn: string;
  public trimedMsisdn: string;
  public isRequestPending = false;
  public isInputInitialFocused = true;

  private logger: LoggerService;

  constructor(
    private formUtils: FormUtilsService,
    private passwordService: PasswordViewService,
    private route: ActivatedRoute,
    private helper: LoginHelperService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PasswordViewComponent');
  }

  public ngOnInit(): void {
    this.passwordForm = new FormGroup({});
    this.trimedMsisdn = this.route.snapshot.params.msisdn;
    this.msisdn = this.helper.addPlusToPhoneNumber(this.route.snapshot.params.msisdn);
  }

  public onFormSubmit = (passwordForm: FormGroup): void => {
    if (passwordForm.valid) {
      this.isRequestPending = true;
      const password = passwordForm.value[this.passwordControlName];

      this.passwordService
        .login(this.msisdn, password)
        .pipe(
          finalize(() => {
            this.isRequestPending = false;
          }),
        )
        .subscribe(status => {
          this.handlePasswordStatus(status);
        });
    } else {
      this.formUtils.validateAllFormFields(passwordForm);
    }
  };

  private handlePasswordStatus = (status: PasswordLoginStatus): void => {
    switch (status) {
      case PasswordLoginStatus.SUCCESS:
        this.logger.debug('Handled password login status ', status);
        break;

      case PasswordLoginStatus.SUCCESS_WITH_INVITATION:
        this.logger.debug('Handled password login status ', status);
        break;

      case PasswordLoginStatus.ERROR:
        this.logger.warn('Handled password login status ', status);
        break;

      case PasswordLoginStatus.WRONG_PASSWORD:
        this.displayIncorrectPasswordError();
        break;

      case PasswordLoginStatus.TOO_MANY_ATTEMPTS:
        this.displayTooManyUnsuccessfulAttemptsError();
        break;

      default:
        this.logger.error('Unhandled PasswordLoginStatus', status);
    }
  };

  private displayIncorrectPasswordError = (): void => {
    this.passwordForm.controls[this.passwordControlName].setErrors({
      [InputPasswordErrorsEnum.IncorrectPassword]: true,
    });
    this.formUtils.validateAllFormFields(this.passwordForm);
  };

  private displayTooManyUnsuccessfulAttemptsError = (): void => {
    this.passwordForm.controls[this.passwordControlName].setErrors({
      [InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts]: true,
    });
    this.formUtils.validateAllFormFields(this.passwordForm);
  };
}
