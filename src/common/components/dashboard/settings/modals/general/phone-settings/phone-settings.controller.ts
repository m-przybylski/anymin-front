import * as angular from 'angular'
const phonenumbers = require('libphonenumber-js')
import {UserService} from '../../../../../../services/user/user.service'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {CommonSettingsService} from '../../../../../../services/common-settings/common-settings.service'
import {httpCodes} from '../../../../../../classes/http-codes'

export interface IGeneralPhoneSettingsControllerScope extends ng.IScope {
  callback: (cb: () => void) => void
}

interface IPrefixListElement {
  value: string
  name: string
}

export class GeneralPhoneSettingsController implements ng.IController {
  public numberPattern = this.CommonSettingsService.localSettings.numberPattern
  public isNewPhoneNumberCreate: boolean = false
  public numberModel: string = ''
  public isNumberExist: boolean = false
  public isNavbar: boolean = true
  public isFullscreen: boolean = true
  public isPhoneNumberInvalid: boolean = false
  public prefixList: IPrefixListElement[] = this.CommonSettingsService.localSettings.countryCodes
    .map((countryCode: string) => ({
      value: countryCode,
      name: countryCode
    }))

  private newEnteredNumber: string
  public prefix = this.prefixList[0].value
  public updatePrefix = (prefix: IPrefixListElement): void => {
    this.prefix = prefix.value
  }

  public setNewNumber = (): void => {
    this.newEnteredNumber = this.numberModel
    this.isNumberExist = false

    if (this.checkIsFormValid(this.prefix, this.numberModel)) {
      this.isPhoneNumberInvalid = false
      this.AccountApi.newMsisdnVerificationRoute({unverifiedMsisdn: this.prefix + this.numberModel}).then(() => {
        this.isNewPhoneNumberCreate = true
        this.isNumberExist = false
      }, (err: any) => {
        if (err.status === httpCodes.conflict) {
          this.isNumberExist = true
        } else {
          this.$log.error('Can not send new phone number: ' + err)
          // TODO UI GLOBAL HANDLE FOR server errors
        }
      })
    } else {
      this.isPhoneNumberInvalid = true
    }
  }

  public sendVerificationPin = (token: string, onError: () => void): void => {
    this.userService.getUser().then(user => {
      this.AccountApi.confirmMsisdnVerificationRoute({
        accountId: user.id,
        token: token
      }).then(() => {
        // FIXME
        this.$scope.callback(() => {})
        this.$uibModalInstance.dismiss('cancel')
      }, (err) => {
        onError();
        this.$log.error('Can not verify number: ' + err);
      })
    })
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')

  }
  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private CommonSettingsService: CommonSettingsService,
              private AccountApi: AccountApi, private $log: ng.ILogService,
              private userService: UserService,
              private $scope: IGeneralPhoneSettingsControllerScope) {
  }

  private checkIsFormValid = (prefix: string, phoneNumber: string): boolean => {
    if (angular.isDefined(prefix) && angular.isDefined(phoneNumber) &&
        prefix && phoneNumber && phoneNumber.length > 1) {
      const fullPhoneNumber = phonenumbers.parse(prefix.toString() + phoneNumber.toString())
      return phonenumbers.isValidNumber(fullPhoneNumber)
    } else {
      return false
    }
  }

  public checkIfNewEnteredNumberExists = (): boolean =>
    this.newEnteredNumber !== this.numberModel

  public checkIsButtonDisabled = (): boolean =>
    this.numberPattern.test(this.numberModel)
}
