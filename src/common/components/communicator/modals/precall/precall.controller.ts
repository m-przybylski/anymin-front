import * as angular from 'angular'
import {PaymentsApi, FinancesApi} from 'profitelo-api-ng/api/api'
import {GetProfile, GetService, MoneyDto} from 'profitelo-api-ng/model/models'
import {IPrimaryDropdownListElement} from '../../../interface/dropdown-primary/dropdown-primary'
import {CommonSettingsService} from '../../../../services/common-settings/common-settings.service'
import {CommonConfig} from '../../../../../../generated_modules/common-config/common-config'
import {TopAlertService} from '../../../../services/top-alert/top-alert.service'
import {ModalsService} from '../../../../services/modals/modals.service'
import {ClientCallService} from '../../call-services/client-call.service'

export interface IPrecallModalControllerScope extends ng.IScope {
  service: GetService,
  owner: GetProfile
}

export class PrecallModalController implements ng.IController {
  public isLoading: boolean = true
  public callLimitModel: number = 0
  private consultationPrice: number
  public paymentMethods: IPrimaryDropdownListElement[] = []
  public clientBalance: IPrimaryDropdownListElement
  public onSelectMain: IPrimaryDropdownListElement
  public isPrepaid: boolean = true
  private prepaidCallLimitModel: number
  public expertAvatar: string
  public priceRegexp: RegExp = this.CommonSettingsService.localSettings.pricePattern
  private moneyDivider: number = this.CommonConfig.getAllData().config.moneyDivider
  private prepaidValue: string
  public prepaidTranslation: string
  public dateTimeLimit: string
  public isMinTimeConsultationBeenReached: boolean = true
  public checkIsPriceInputValid: boolean = true
  public isInputValueGreaterThanAccountBalance: boolean = true
  public serviceName: string = ''
  public servicePrice: MoneyDto
  public serviceOwnerName: string = ''

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  private service: GetService
  private serviceOwner: GetProfile
  private readonly moneyNumberOfDecimalPlaces: number = 2
  private readonly secondPerMinute: number = 60
  private partOfStringTimeStart: number = 11
  private partOfStringTimeLength: number = 8
  private readonly minPrepaidMinutesTimeLimitToCall: number = 2

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private FinancesApi: FinancesApi,
              private PaymentsApi: PaymentsApi,
              private CommonSettingsService: CommonSettingsService,
              private CommonConfig: CommonConfig,
              private topAlertService: TopAlertService,
              private $filter: ng.IFilterService,
              private $state: ng.ui.IStateService,
              private modalsService: ModalsService,
              private clientCallService: ClientCallService,
              private $scope: IPrecallModalControllerScope) {
  }

  $onInit = (): void => {
    this.prepaidValue = this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.PREPAID.READONLY.VALUE')
    this.prepaidTranslation= this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.PREPAID.LABEL')
    this.dateTimeLimit = this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE')

    this.service = this.$scope.service
    this.serviceOwner = this.$scope.owner

    if (this.service) {
      this.consultationPrice = this.service.price.amount / this.moneyDivider
      this.serviceName = this.service.name
      this.servicePrice = this.service.price
    }

    if (this.serviceOwner && this.serviceOwner.organizationDetails) {
      this.expertAvatar = this.serviceOwner.organizationDetails.logo
      this.serviceOwnerName = this.serviceOwner.organizationDetails.name
    }
    else if (this.serviceOwner && this.serviceOwner.expertDetails) {
      this.serviceOwnerName = this.serviceOwner.expertDetails.name
      this.expertAvatar = this.serviceOwner.expertDetails.avatar
    }

    this.PaymentsGetCreditCardsRoute()
    this.FinanceGetClientBalanceRoute()
  }

  private PaymentsGetCreditCardsRoute = () => {
    this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
      this.isLoading = false
      this.paymentMethods = paymentMethods.map((el) => ({
        name: el.cardType + ': ' + el.maskedNumber,
        value: el.token
      }))
      this.paymentMethods.push(this.clientBalance)
    }, (error) => {
      this.$log.error(error)
      this.topAlertService.error({
        message: this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.ERROR.NO_RESPONSE'),
        timeout: 2
      })
      this.$uibModalInstance.dismiss('cancel')
    })
  }

  private FinanceGetClientBalanceRoute = () => {
    this.FinancesApi.getClientBalanceRoute().then((clientBalance) => {
      this.prepaidCallLimitModel = clientBalance.amount
      this.clientBalance = {
        name: this.prepaidTranslation + ' '
        + (clientBalance.amount / this.moneyDivider).toFixed(this.moneyNumberOfDecimalPlaces) + ' '
        + clientBalance.currency,
        value: this.prepaidValue
      }
      this.onSelectMain = this.clientBalance
    }, (error) => {
      this.$log.error(error)
      this.topAlertService.error({
        message: this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.ERROR.NO_RESPONSE'),
        timeout: 2
      })
      this.$uibModalInstance.dismiss('cancel')
    })
  }

  public startCall = (): void => {
    this.clientCallService.callServiceId(this.service.id)
    this.$uibModalInstance.dismiss('cancel')
  }

  public addNewPaymentMethod = (): void => {
    this.modalsService.createAddPaymentMethodControllerModal(this.onModalClose)
    this.$uibModalInstance.dismiss('cancel')
  }

  public showChargeAccountModal = (): void => {
    this.$state.go('app.charge-account')
    this.$uibModalInstance.dismiss('cancel')
  }

  public onPriceChange = (consultationCostModel: string): void => {
    const amount = Number(consultationCostModel.toString().replace(',', '.'))
    this.changeAmountPerTimeCall(amount)
    this.isMinTimeConsultationBeenReached = this.checkIfMinPrepaidMinutesTimeLimitToCallRechared(amount)
    this.checkIsPriceInputValid = this.checkIfPriceInputIsValid(amount)
    this.isInputValueGreaterThanAccountBalance = this.checkIfInputValueIsGratherThanAccountBalance(amount)
  }

  private changeAmountPerTimeCall = (inputValue: number): void => {
    const date: Date = new Date(0)
    date.setSeconds(inputValue / this.consultationPrice * this.secondPerMinute)

    if (inputValue !== 0)
      this.dateTimeLimit = date.toISOString().substr(this.partOfStringTimeStart, this.partOfStringTimeLength)
    else
      this.dateTimeLimit = this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE')
  }

  public onSelectItemDropdown = (data: IPrimaryDropdownListElement): void => {
    this.callLimitModel = 0
    this.dateTimeLimit = this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE')

    // TODO Wait for: https://git.contactis.pl/itelo/profitelo/issues/1015
    const input = angular.element('input-price input')[0]
    this.isPrepaid = data.value === this.prepaidValue

    if (input) {
      input.focus()
    } else {
      this.topAlertService.error({
        message: this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.ERROR.INPUT'),
        timeout: 2
      })
      this.$uibModalInstance.dismiss('cancel')
    }
  }

  private checkIfInputValueIsGratherThanAccountBalance = (model: number): boolean =>
    this.isPrepaid ? ((model <= this.prepaidCallLimitModel / this.moneyDivider)) || model === 0 : model >= 0

  private checkIfPriceInputIsValid = (model: number): boolean =>
    (model && this.priceRegexp.test(model.toString())) || model === 0

  private checkIfMinPrepaidMinutesTimeLimitToCallRechared = (model: number): boolean =>
    this.isPrepaid ? (model / this.consultationPrice) >= this.minPrepaidMinutesTimeLimitToCall || model === 0 : true
}
