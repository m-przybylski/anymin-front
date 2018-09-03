import { Component } from '@angular/core';
import { ModalContainerWidthEnum } from '../../../../../../../shared/components/modals/modal/modal.component';
import { PostRecoverPassword } from '@anymind-ng/api';
import { Alerts, AlertService, LoggerFactory, LoggerService } from '@anymind-ng/core';
import { PinVerificationStatus } from '../pin-verification/pin-verification.component.service';
import { IPinVerificationStatus, PinVerificationPurposeEnum } from '../pin-verification/pin-verification.component';
import { UserSessionService } from '../../../../../../../core/services/user-session/user-session.service';

enum ChangePasswordModalStepEnum {
  CHANGE_PASSWORD,
  PIN_VERIFICATION,
  SET_NEW_PASSWORD,
  EMAIL_CONFIRMATION
}

@Component({
  selector: 'plat-password-settings',
  templateUrl: './password-settings.view.component.html',
  styleUrls: ['./password-settings.view.component.sass']
})
export class PasswordSettingsViewComponent {

  public readonly modalWidth = ModalContainerWidthEnum.SMALL_WIDTH;
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
    emailConfirmation: 'DASHBOARD.SETTINGS.EMAIL_CONFIRMATION.TITLE'
  };
  private logger: LoggerService;

  constructor(private alertService: AlertService,
              private userSessionService: UserSessionService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('PasswordSettingsViewComponent');
    this.modalHeaderTrKey = this.modalHeaderTranslations.changePassword;
    this.getUserMsisdn();
  }

  public onRecoverPassword = (recoverMethod: PostRecoverPassword.MethodEnum): void => {
    switch (recoverMethod) {
      case PostRecoverPassword.MethodEnum.EMAIL:
        this.modalStep = ChangePasswordModalStepEnum.EMAIL_CONFIRMATION;
        this.modalHeaderTrKey = this.modalHeaderTranslations.emailConfirmation;
        break;

      case PostRecoverPassword.MethodEnum.SMS:
        this.modalStep = ChangePasswordModalStepEnum.PIN_VERIFICATION;
        this.modalHeaderTrKey = this.modalHeaderTranslations.pinVerification;
        break;

      default:
        this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
        this.logger.error('unhandled password recover method', recoverMethod);
    }
  }

  public onPinVerification = (pinVerification: IPinVerificationStatus): void => {
    if (pinVerification.status === PinVerificationStatus.SUCCESS) {
      this.modalStep = ChangePasswordModalStepEnum.SET_NEW_PASSWORD;
      this.pinToken = pinVerification.token;
      this.modalHeaderTrKey = this.modalHeaderTranslations.setPassword;
    } else {
      this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
      this.logger.error('unhandled pin verification status', status);
    }
  }

  public onGoBack = (): void => {
    this.modalStep = ChangePasswordModalStepEnum.CHANGE_PASSWORD;
  }

  private getUserMsisdn = (): void => {
    this.userSessionService.getSession()
      .then(session => {
        this.msisdn = session.account.msisdn;
      })
      .catch(err => {
        this.logger.warn('error when try to get session', err);
      });
  }

}
