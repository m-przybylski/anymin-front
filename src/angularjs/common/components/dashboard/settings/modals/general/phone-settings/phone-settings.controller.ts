import {GeneralPhoneSettingsControllerService, IPrefixListElement} from './phone-settings.service'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'

export interface IGeneralPhoneSettingsControllerScope extends ng.IScope {
  callback: (cb: () => void) => void
}

export class GeneralPhoneSettingsController implements ng.IController {
  public numberModel: string = ''
  public prefixList: IPrefixListElement[] = []
  public prefixPlaceholder: string
  public counter: number

  /* @ngInject */
  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private generalPhoneSettingsControllerService: GeneralPhoneSettingsControllerService,
              private AccountApi: AccountApi,
              private errorHandler: ErrorHandlerService,
              private $scope: IGeneralPhoneSettingsControllerScope) {}

  $onInit(): void {
    this.prefixList = this.setPrefixList()
    this.prefixPlaceholder = this.prefixList[0].value
    this.generalPhoneSettingsControllerService.onCountDownUpdate(this.updateCountDown)
  }

  public updateCountDown = (time: number): number =>
    this.counter = time

  public onSubmit = (): void => {
    this.generalPhoneSettingsControllerService.markNumberAsUsed(this.numberModel)
  }

  public onInputValueChange = (): void =>
    this.generalPhoneSettingsControllerService.onPhoneNumberChange()

  public isNumberExist = (): boolean =>
    this.generalPhoneSettingsControllerService.getIsNumberExist()

  public isNumberValid = (): boolean =>
    this.generalPhoneSettingsControllerService.onNumberValid(this.numberModel)

  public isButtonDisabled = (): boolean =>
    this.generalPhoneSettingsControllerService.onButtonDisabled(this.numberModel)

  public showPinCodeForm = (): boolean =>
    this.generalPhoneSettingsControllerService.getIsNewPhoneNumberCreate()

  private setPrefixList = (): IPrefixListElement[] => this.generalPhoneSettingsControllerService.getPrefixList()

  public setPrefix = (prefix: IPrefixListElement): void => {
    this.prefixPlaceholder = prefix.value
    this.generalPhoneSettingsControllerService.updatePrefix(prefix)
  }

  public sendVerificationPin = (token: string, onError: () => void): void => {
    this.generalPhoneSettingsControllerService.sendVerificationPin().then(user => {
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
  }

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')
}
