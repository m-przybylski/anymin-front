import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SetNewPasswordComponentService, SetNewPasswordStatusEnum } from './set-new-password.component.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Alerts, AlertService, FormUtilsService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { CommonSettingsService } from '../../../../../../../../../angularjs/common/services/common-settings/common-settings.service';
import { InputSetPasswordErrors } from '../../../../../../../../shared/components/inputs/input-set-password/input-set-password.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plat-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.sass'],
  providers: [SetNewPasswordComponentService],
})
export class SetNewPasswordComponent implements OnDestroy {
  @Input()
  public msisdn: string;

  @Input()
  public token: string;

  public readonly setPasswordFormId = 'setPasswordForm';
  public readonly passwordControlName = 'password';

  public isRequestPending = false;
  public setPasswordForm: FormGroup = new FormGroup({});

  private logger: LoggerService;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private setNewPasswordComponentService: SetNewPasswordComponentService,
    private formUtils: FormUtilsService,
    private alertService: AlertService,
    private commonSettingService: CommonSettingsService,
    private activeModal: NgbActiveModal,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('SetNewPasswordComponent');
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onFormSubmit = (setPasswordForm: FormGroup): void => {
    if (setPasswordForm.valid) {
      const password = this.setPasswordForm.value[this.passwordControlName];
      if (this.isTokenValid()) {
        this.isRequestPending = true;
        this.setNewPasswordComponentService
          .setNewPassword(this.msisdn, this.token, password)
          .pipe(finalize(() => (this.isRequestPending = false)))
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(this.handleNewPasswordStatus);
      } else {
        this.logger.error('token is not valid when try to submit form', this.token);
        this.alertService.pushDangerAlert(Alerts.CannotFindMsisdnToken);
      }
    } else {
      this.formUtils.validateAllFormFields(setPasswordForm);
    }
  };

  private displayIncorrectPasswordError = (): void => {
    this.setPasswordForm.controls[this.passwordControlName].setErrors({
      [InputSetPasswordErrors.IncorrectPassword]: true,
    });
    this.formUtils.validateAllFormFields(this.setPasswordForm);
  };

  private handleNewPasswordStatus = (status: SetNewPasswordStatusEnum): void => {
    switch (status) {
      case SetNewPasswordStatusEnum.INVALID:
        this.displayIncorrectPasswordError();
        break;

      case SetNewPasswordStatusEnum.NO_TOKEN:
        this.logger.info('Handled password status NO_TOKEN', status);
        break;

      case SetNewPasswordStatusEnum.SUCCESS:
        this.activeModal.close();
        break;

      case SetNewPasswordStatusEnum.ERROR:
        this.logger.info('Handled password status ERROR', status);
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('Unhandled password status ', status);
    }
  };

  private isTokenValid = (): boolean => this.commonSettingService.localSettings.smsCodePattern.test(this.token);
}
