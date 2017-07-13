import {PaymentsApi, FinancesApi} from 'profitelo-api-ng/api/api'
import {IDropdownItem} from '../../../interface/dropdown-primary/dropdown-primary'
import {CommonSettingsService} from '../../../../services/common-settings/common-settings.service'
import {CommonConfig} from '../../../../../../generated_modules/common-config/common-config'
import {TopAlertService} from '../../../../services/top-alert/top-alert.service'
import {ModalsService} from '../../../../services/modals/modals.service'

export interface IPreallcallModalControllerScope extends ng.IScope {}

export class PreallcallModalController implements ng.IController {
  public isLoading: boolean = true
  public callLimitModel: number = 0
  public consultationPrice: number = 2.5
  public paymentMethods: IDropdownItem[] = []
  public clientBalance: IDropdownItem
  public onSelectMain: IDropdownItem
  public showPrepaidLink: boolean = true
  private prepaidCallLimitModel: number
  public priceRegexp: RegExp = this.CommonSettingsService.localSettings.pricePrecallPattern
  private minTimeCall: boolean = false
  private moneyDivider: number = this.CommonConfig.getAllData().config.moneyDivider
  private static readonly prepaidValue: string = 'prepaid'

  public onModalClose = () =>
    this.$uibModalInstance.dismiss('cancel')

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private FinancesApi: FinancesApi,
              private PaymentsApi: PaymentsApi,
              private CommonSettingsService: CommonSettingsService,
              private CommonConfig: CommonConfig,
              private topAlertService: TopAlertService,
              private $filter: ng.IFilterService,
              private modalsService: ModalsService) {

    this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
      this.isLoading = false
      this.paymentMethods = paymentMethods.map((el) => ({
        name: el.cardType + ': ' + el.maskedNumber ,
        value: el.token
      }))
      this.paymentMethods.push(this.clientBalance)
    }, (error) => {
      this.$log.error(error)
      this.topAlertService.success({
        message: this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.ERROR.NO_RESPONSE'),
        timeout: 2
      })
      this.$uibModalInstance.dismiss('cancel')
    })

    this.FinancesApi.getClientBalanceRoute().then((clientBalance) => {
      this.prepaidCallLimitModel = clientBalance.amount
      this.clientBalance = {
        name: 'Prepaid: ' + (clientBalance.amount / this.moneyDivider).toFixed(2) + ' ' + clientBalance.currency,
        value: PreallcallModalController.prepaidValue
      }
      this.onSelectMain = this.clientBalance
    }, (error) => {
      this.$log.error(error)
      this.topAlertService.success({
        message: this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.ERROR.NO_RESPONSE'),
        timeout: 2
      })
      this.$uibModalInstance.dismiss('cancel')
    })
  }

  public addNewPaymentMethod = (): void => {
    this.modalsService.createAddPaymentMethodControllerModal(this.onModalClose)
  }

  public checkIsPriceInputValid = (): boolean => {
    return !!(this.callLimitModel && ((this.priceRegexp).test(this.callLimitModel.toString())) &&
    this.showPrepaidLink ? (Number(this.callLimitModel.toString().replace(',', '.')) <= this.prepaidCallLimitModel / this.moneyDivider)
    && this.minTimeCall  : 0 || this.callLimitModel === 0)
  }

  public selectedItemDropdown = (data: IDropdownItem): boolean =>
    this.showPrepaidLink = data.value === PreallcallModalController.prepaidValue

  public isPrepaidTimeConsultationCorrect = (isValid: boolean): void => {
    this.minTimeCall = isValid
  }
}
