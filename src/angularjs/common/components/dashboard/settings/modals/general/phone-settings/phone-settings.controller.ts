// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:no-shadowed-variable
// tslint:disable:no-empty
// tslint:disable:deprecation
import { PhoneSettingsService, IPrefixListElement } from './phone-settings.service';
import { AccountApi } from 'profitelo-api-ng/api/api';
import { ErrorHandlerService } from '../../../../../../services/error-handler/error-handler.service';
import { UserService } from '../../../../../../services/user/user.service';
import {
  BackendError, BackendErrors,
  isBackendError
} from '../../../../../../../../app/shared/models/backend-error/backend-error';

export interface IPhoneSettingsControllerScope extends ng.IScope {
  callback: (cb: () => void) => void;
}

// tslint:disable:member-ordering
export class PhoneSettingsController implements ng.IController {
  public numberModel = '';
  public prefixList: IPrefixListElement[] = [];
  public prefixPlaceholder: string;
  public counter: number;
  public showPinCodeForm: boolean;

  public static $inject = ['$uibModalInstance', 'phoneSettingsService', 'AccountApi', 'userService', 'errorHandler',
    '$scope', '$log'];

  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private phoneSettingsService: PhoneSettingsService,
              private AccountApi: AccountApi,
              private userService: UserService,
              private errorHandler: ErrorHandlerService,
              private $scope: IPhoneSettingsControllerScope,
              private $log: ng.ILogService) {
  }

  public $onInit(): void {
    this.prefixList = this.phoneSettingsService.getPrefixList();
    this.prefixPlaceholder = this.prefixList[0].value;
    this.phoneSettingsService.onCountDownUpdate(this.updateCountDown);
    this.phoneSettingsService.onNewPhoneNumberCreate(this.udpatePinCodeFormVisibility);
  }

  public updateCountDown = (time: number): number =>
    this.counter = time

  public onSubmit = (): void => {
    this.phoneSettingsService.addNewNumber(this.numberModel);
  }

  public onInputValueChange = (): void =>
    this.phoneSettingsService.onPhoneNumberChange()

  public isNumberExist = (): boolean =>
    this.phoneSettingsService.getIsNumberExist()

  public isNumberValid = (): boolean =>
    this.phoneSettingsService.setNumberValid(this.numberModel)

  public isBackendValidationError = (): boolean =>
    this.phoneSettingsService.isBackendValidationError()

  public isButtonDisabled = (): boolean =>
    this.phoneSettingsService.setButtonDisabled(this.numberModel)

  public isReSendSmsFailed = (): boolean =>
    this.phoneSettingsService.isReSendSmsFailed()

  private udpatePinCodeFormVisibility = (formVisibility: boolean): boolean =>
    this.showPinCodeForm = formVisibility

  public setPrefix = (prefix: IPrefixListElement): void => {
    this.prefixPlaceholder = prefix.value;
    this.phoneSettingsService.updatePrefix(prefix);
  }

  public reSendSms = (): ng.IPromise<void> =>
    this.phoneSettingsService.onSendSms(this.numberModel)

  public getPhoneNumber = (token: string, onError: () => void): ng.IPromise<void> =>
    this.userService.getUser().then(user => {
      this.AccountApi.confirmMsisdnVerificationRoute({
        token,
        accountId: user.id
      }).then(() => {
        this.$scope.callback(() => {});
        this.$uibModalInstance.dismiss('cancel');
      }, (err) => {
        if (isBackendError(err.data)) {
          this.handleBackendError(err.data, onError);
        } else {
          this.errorHandler.handleServerError(err);
          this.$log.error('PhoneSettingsController: error when confirm msisdn verification: ', err);
        }
      });
    })

  public onModalClose = (): void => {
    this.phoneSettingsService.clearInterval();
    this.$uibModalInstance.dismiss('cancel');
  }

  private handleBackendError = (error: BackendError, onError: () => void): void => {
    switch (error.code) {
      case BackendErrors.IncorrectValidation:
        onError();
        this.$log.error('PhoneSettingsController: error when confirm msisdn verification: ', error);
        break;

      case BackendErrors.CanNotFindMsisdnVerification:
        onError();
        this.$log.error('PhoneSettingsController: error when confirm msisdn verification: ', error);
        break;

      default:
        this.$log.error('PhoneSettingsController: unhandled backend error: ', error);
        this.errorHandler.handleServerError(error);
    }
  }

}
