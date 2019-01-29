import { AfterViewInit, Component } from '@angular/core';
import { ModalContainerTypeEnum } from '@platform//shared/components/modals/modal/modal.component';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { PinVerificationStatus } from '../pin-verification/pin-verification.component.service';
import { IPinVerificationStatus, PinVerificationPurposeEnum } from '../pin-verification/pin-verification.component';
import { ModalAnimationComponentService } from '@platform/shared/components/modals/modal/animation/modal-animation.animation.service';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { Store } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import { take } from 'rxjs/operators';

enum ChangePasswordModalStepEnum {
  CHANGE_PASSWORD,
  PIN_VERIFICATION,
  SET_NEW_PASSWORD,
  EMAIL_CONFIRMATION,
}

@Component({
  selector: 'plat-password-settings',
  templateUrl: './password-settings.view.component.html',
  styleUrls: ['./password-settings.view.component.sass'],
})
export class PasswordSettingsViewComponent implements AfterViewInit {
  public readonly modalWidth = ModalContainerTypeEnum.SMALL_WIDTH;
  public readonly modalSteps: typeof ChangePasswordModalStepEnum = ChangePasswordModalStepEnum;
  public modalStep: ChangePasswordModalStepEnum = ChangePasswordModalStepEnum.CHANGE_PASSWORD;
  public modalHeaderTrKey: string;
  public pinToken: string;
  public msisdn: string;
  public pinVerificationPurpose: PinVerificationPurposeEnum = PinVerificationPurposeEnum.PASSWORD_CHANGE;

  private readonly modalHeaderTranslations = {
    changePassword: 'DASHBOARD.SETTINGS.CHANGE_PASSWORD.TITLE',
    pinVerification: 'DASHBOARD.SETTINGS.PIN_VERIFICATION.TITLE',
    setPassword: 'DASHBOARD.SETTINGS.SET_PASSWORD.TITLE',
    emailConfirmation: 'DASHBOARD.SETTINGS.EMAIL_CONFIRMATION.TITLE',
  };
  private logger: LoggerService;

  constructor(
    private store: Store<fromRoot.IState>,
    private alertService: AlertService,
    private modalAnimationComponentService: ModalAnimationComponentService,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('PasswordSettingsViewComponent');
    this.modalHeaderTrKey = this.modalHeaderTranslations.changePassword;
    this.getUserMsisdn();
  }

  public ngAfterViewInit(): void {
    this.modalAnimationComponentService.onModalContentChange().next(false);
  }

  public onRecoverPassword = (): void => {
    this.modalStep = ChangePasswordModalStepEnum.EMAIL_CONFIRMATION;
    this.modalHeaderTrKey = this.modalHeaderTranslations.emailConfirmation;
  };

  public onPinVerification = (pinVerification: IPinVerificationStatus): void => {
    if (pinVerification.status === PinVerificationStatus.SUCCESS) {
      this.modalStep = ChangePasswordModalStepEnum.SET_NEW_PASSWORD;
      this.pinToken = pinVerification.token;
      this.modalHeaderTrKey = this.modalHeaderTranslations.setPassword;
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.error('unhandled pin verification status', status);
    }
  };

  public onGoBack = (): void => {
    this.modalStep = ChangePasswordModalStepEnum.CHANGE_PASSWORD;
  };

  private getUserMsisdn = (): void => {
    getNotUndefinedSession(this.store)
      .pipe(take(1))
      .subscribe(getSessionWithAccount => {
        this.msisdn = getSessionWithAccount.account.msisdn ? getSessionWithAccount.account.msisdn : '';
      });
  };
}
