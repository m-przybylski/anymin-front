import { JValue, PutPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { CommonSettingsService } from '../../../../../../services/common-settings/common-settings.service';
import { PayoutsMethodsModalService } from './payouts-methods.service';

export interface IPayoutsModalControllerScope extends ng.IScope {
  onModalCloseCallback: () => void;
}

// tslint:disable:member-ordering
export class PayoutsMethodsModalController implements ng.IController {
  public isPayoutBankMethod = false;
  public isPayoutPaypalMethod = false;
  public isLoading = false;
  public payPalEmail = '';
  public bankAccountNumber = '';
  public emailPattern = this.CommonSettingsService.localSettings.emailPattern;
  public bankAccountNumberPattern = this.CommonSettingsService.localSettings.bankAccountNumberPattern;
  public payoutMethod = '';

  private onModalCloseCallback: () => void;
  private static readonly payoutMethodId = {
    bankAccount: 'bankAccount',
    payPalAccount: 'paypalAccount'
  };

  public static $inject = ['$uibModalInstance', '$scope', 'CommonSettingsService', 'payoutsMethodsModalService'];

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IPayoutsModalControllerScope,
              private CommonSettingsService: CommonSettingsService,
              private payoutsMethodsModalService: PayoutsMethodsModalService) {

    this.onModalCloseCallback = this.$scope.onModalCloseCallback;
  }

  public isPayPalEmailValid = (): boolean => this.payPalEmail !== '' && this.emailPattern.test(this.payPalEmail);

  public isBankAccountNumberValid = (): boolean =>
    this.bankAccountNumber !== '' && this.bankAccountNumberPattern.test(this.bankAccountNumber)

  public addPayPalAccount = (): void => {
    this.isLoading = true;
    const payoutMethod: PutPayoutMethodDto = {
      payPalAccount: {
        email: this.payPalEmail
      }
    };
    this.payoutsMethodsModalService.putPayoutMethod(payoutMethod)
      .then(this.onPutPayoutMethodSucceed, this.onPutPayoutMethodError);
  }

  public addBankAccount = (): void => {
    this.isLoading = true;
    const payoutMethod: PutPayoutMethodDto = {
      bankAccount: {
        accountNumber: this.bankAccountNumber
      }
    };
    this.payoutsMethodsModalService.putPayoutMethod(payoutMethod)
      .then(this.onPutPayoutMethodSucceed, this.onPutPayoutMethodError);
  }

  public choosePayoutPaypalMethod = (): void => {
    this.payoutMethod = PayoutsMethodsModalController.payoutMethodId.payPalAccount;
  }

  public choosePayoutBankMethod = (): void => {
    this.payoutMethod = PayoutsMethodsModalController.payoutMethodId.bankAccount;
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
  }

  private onPutPayoutMethodSucceed = (_response: ng.IPromise<JValue>): void => {
    this.onModalCloseCallback();
    this.$uibModalInstance.dismiss('cancel');
  }

  private onPutPayoutMethodError = (): void => {
    this.isLoading = false;
  }

}
