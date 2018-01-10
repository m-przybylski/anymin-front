import {JValue, PutPayoutMethodDto} from 'profitelo-api-ng/model/models'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import {PayoutsModalService} from './payouts.service'

export interface IPayoutsModalControllerScope extends ng.IScope {
  onModalCloseCallback: () => void
}

export class PayoutsModalController implements ng.IController {
  public isPayoutBankMethod: boolean = false
  public isPayoutPaypalMethod: boolean = false
  public isLoading: boolean = false
  public payPalEmail: string = ''
  public bankAccountNumber: string = ''
  public emailPattern = this.CommonSettingsService.localSettings.emailPattern
  public bankAccountNumberPattern = this.CommonSettingsService.localSettings.bankAccountNumberPattern
  public payoutMethod: string = ''

  private onModalCloseCallback: () => void
  private static readonly payoutMethodId = {
    bankAccount: 'bankAccount',
    payPalAccount: 'paypalAccount'
  }

    constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private $scope: IPayoutsModalControllerScope,
              private CommonSettingsService: CommonSettingsService,
              private payoutsModalService: PayoutsModalService) {

    this.onModalCloseCallback = this.$scope.onModalCloseCallback
  }

  public isPayPalEmailValid = (): boolean => this.payPalEmail !== '' && this.emailPattern.test(this.payPalEmail)

  public isBankAccountNumberValid = (): boolean =>
    this.bankAccountNumber !== '' && this.bankAccountNumberPattern.test(this.bankAccountNumber)

  public addPayPalAccount = (): void => {
    this.isLoading = true
    const payoutMethod: PutPayoutMethodDto = {
      payPalAccount: {
        email: this.payPalEmail
      }
    }
    this.payoutsModalService.putPayoutMethod(payoutMethod)
      .then(this.onPutPayoutMethodSucceed, this.onPutPayoutMethodError)
  }

  public addBankAccount = (): void => {
    this.isLoading = true
    const payoutMethod: PutPayoutMethodDto = {
      bankAccount: {
        accountNumber: this.bankAccountNumber
      }
    }
    this.payoutsModalService.putPayoutMethod(payoutMethod)
      .then(this.onPutPayoutMethodSucceed, this.onPutPayoutMethodError)
  }

  public choosePayoutPaypalMethod = (): void => {
    this.payoutMethod = PayoutsModalController.payoutMethodId.payPalAccount
  }

  public choosePayoutBankMethod = (): void => {
    this.payoutMethod = PayoutsModalController.payoutMethodId.bankAccount
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  private onPutPayoutMethodSucceed = (_response: ng.IPromise<JValue>): void => {
    this.onModalCloseCallback()
    this.$uibModalInstance.dismiss('cancel')
  }

  private onPutPayoutMethodError = (): void => {
    this.isLoading = false
  }

}
