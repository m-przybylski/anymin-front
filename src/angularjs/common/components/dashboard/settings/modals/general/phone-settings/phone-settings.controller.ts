import {PhoneSettingsService, IPrefixListElement} from './phone-settings.service'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'
import {UserService} from '../../../../../../services/user/user.service'

export interface IPhoneSettingsControllerScope extends ng.IScope {
  callback: (cb: () => void) => void
}

export class PhoneSettingsController implements ng.IController {
  public numberModel: string = ''
  public prefixList: IPrefixListElement[] = []
  public prefixPlaceholder: string
  public counter: number
  public showPinCodeForm: boolean

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private phoneSettingsService: PhoneSettingsService,
              private AccountApi: AccountApi,
              private userService: UserService,
              private errorHandler: ErrorHandlerService,
              private $scope: IPhoneSettingsControllerScope) {}

  $onInit(): void {
    this.prefixList = this.phoneSettingsService.getPrefixList()
    this.prefixPlaceholder = this.prefixList[0].value
    this.phoneSettingsService.onCountDownUpdate(this.updateCountDown)
    this.phoneSettingsService.onNewPhoneNumberCreate(this.udpatePinCodeFormVisibility)
  }

  public updateCountDown = (time: number): number =>
    this.counter = time

  public onSubmit = (): void => {
    this.phoneSettingsService.markNumberAsUsed(this.numberModel)
  }

  public onInputValueChange = (): void =>
    this.phoneSettingsService.onPhoneNumberChange()

  public isNumberExist = (): boolean =>
    this.phoneSettingsService.getIsNumberExist()

  public isNumberValid = (): boolean =>
    this.phoneSettingsService.setNumberValid(this.numberModel)

  public isButtonDisabled = (): boolean =>
    this.phoneSettingsService.setButtonDisabled(this.numberModel)

  private udpatePinCodeFormVisibility = (formVisibility: boolean): boolean =>
    this.showPinCodeForm = formVisibility

  public setPrefix = (prefix: IPrefixListElement): void => {
    this.prefixPlaceholder = prefix.value
    this.phoneSettingsService.updatePrefix(prefix)
  }

  public reSendSms = (): ng.IPromise<void> =>
    this.phoneSettingsService.onSendSms(this.numberModel)

  public getPhoneNumber = (token: string, onError: () => void): ng.IPromise<void> =>
    this.userService.getUser().then(user => {
      this.AccountApi.confirmMsisdnVerificationRoute({
        token,
        accountId: user.id
      }).then(() => {
        this.$scope.callback(() => {})
        this.$uibModalInstance.dismiss('cancel')
      }, (err) => {
        this.errorHandler.handleServerError(err)
        onError()
      })
    })

  public onModalClose = (): void => {
    this.phoneSettingsService.clearInterval()
    this.$uibModalInstance.dismiss('cancel')
  }
}
