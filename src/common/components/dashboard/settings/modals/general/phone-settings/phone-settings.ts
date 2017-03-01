namespace profitelo.components.dashboard.settings.modals.general.phoneSettings {

  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import IPhoneNumberService = profitelo.services.phoneNumber.IPhoneNumberService
  import IAccountApi = profitelo.api.IAccountApi
  import IUserService = profitelo.services.user.IUserService

  interface IPrefixListElement {
    value: string
    name: string
  }

  export interface IGeneralPhoneSettingsControllerScope extends ng.IScope {
    callback: () => void
  }

  export class GeneralPhoneSettingsController implements ng.IController {

    public isNewPhoneNumberCreate: boolean = false
    public number: string
    public isNumberExist: boolean = false
    public isNavbar: boolean = true
    public isFullscreen: boolean = true
    public isPhoneNumberInvalid: boolean = false
    public prefixList: Array<IPrefixListElement> = this.CommonSettingsService.localSettings.countryCodes.map((countryCode: string) =>
      ({
        value: countryCode,
        name: countryCode
      }))

    public prefix = this.prefixList[0].value
    public updatePrefix = (prefix: IPrefixListElement) => {
      this.prefix = prefix.value
    }

    public setNewNumber = (): void => {
      if (this.checkIsFormValid(this.prefix, this.number)) {
        this.isPhoneNumberInvalid = false
        this.AccountApi.newMsisdnVerificationRoute({unverifiedMsisdn: this.prefix + this.number}).then(() => {
          this.isNewPhoneNumberCreate = true
          this.isNumberExist = false
        }, (err: any) => {
          if (err.status === 409) {
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

    public sendVerificationPin = (token: string, onError: () => void) => {
      this.userService.getUser().then(user => {
        this.AccountApi.confirmMsisdnVerificationRoute({
          accountId: user.id,
          token: token
        }).then(() => {
          this.$scope.callback()
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
                private CommonSettingsService: ICommonSettingsService,
                private phoneNumberService: IPhoneNumberService,
                private AccountApi: IAccountApi, private $log: ng.ILogService,
                private userService: IUserService,
                private $scope: IGeneralPhoneSettingsControllerScope) {
    }

    private checkIsFormValid = (prefix: string, number: string): boolean => {
      if (angular.isDefined(prefix) && angular.isDefined(number) && prefix && number && number.length > 1) {
        const fullPhoneNumber = this.phoneNumberService.parse(prefix.toString() + number.toString())
        return this.phoneNumberService.isValidNumber(fullPhoneNumber)
      } else {
        return false
      }
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.phone-settings', [
    'ui.bootstrap',
    'profitelo.directives.interface.pro-input',
    'profitelo.services.phone-number',
    'profitelo.api.AccountApi',
    'profitelo.directives.interface.scrollable',
    'profitelo.services.commonSettings',
    'profitelo.services.user',
    'profitelo.components.interface.dropdown-primary',
    'profitelo.components.interface.pin-verification'
  ])
  .controller('generalPhoneSettingsController', GeneralPhoneSettingsController)

}
