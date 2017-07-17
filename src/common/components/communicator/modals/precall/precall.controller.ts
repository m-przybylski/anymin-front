import * as angular from 'angular'
import {PaymentsApi, FinancesApi} from 'profitelo-api-ng/api/api'
import {GetProfile, GetService} from 'profitelo-api-ng/model/models'
import {IPrimaryDropdownListElement} from '../../../interface/dropdown-primary/dropdown-primary'
import {CommonSettingsService} from '../../../../services/common-settings/common-settings.service'
import {CommonConfig} from '../../../../../../generated_modules/common-config/common-config'
import {TopAlertService} from '../../../../services/top-alert/top-alert.service'
import {ModalsService} from '../../../../services/modals/modals.service'
import {ClientCallService} from '../../call-services/client-call.service'

interface IPartOfStringTime {
  start: number,
  length: number
}

export interface IPrecallModalControllerScope extends ng.IScope {
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
  private minTimeCall: boolean = true
  private moneyDivider: number = this.CommonConfig.getAllData().config.moneyDivider
  readonly prepaidValue: string = this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.PREPAID.READONLY.VALUE')
  public prepaidTranslation: string = this.$filter('translate')('COMMUNICATOR.MODALS.PRECALL.PREPAID.LABEL')
  public timeCounter: string = 'COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE'
  public isMinTimeConsultationBeenReached: boolean = true
  public isPriceInputIsValid: boolean = true
  public isMaxPriceInputReachedIsValid: boolean = true
  public serviceName: string = ''
  public serviceOwnerName: string = ''

  public onModalClose = (): void =>
    this.$uibModalInstance.dismiss('cancel')

  private service: GetService
  private serviceOwner: GetProfile
  private readonly decimal: number = 2
  private readonly secondPerMinute: number = 60
  private readonly partOfStringTime: IPartOfStringTime = {
    start: 11,
    length: 8
  }
  private readonly minTimePrepaid: number = 2

  /* @ngInject */
  constructor($scope: ng.IScope,
              private $log: ng.ILogService,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private FinancesApi: FinancesApi,
              private PaymentsApi: PaymentsApi,
              private CommonSettingsService: CommonSettingsService,
              private CommonConfig: CommonConfig,
              private topAlertService: TopAlertService,
              private $filter: ng.IFilterService,
              private $state: ng.ui.IStateService,
              private modalsService: ModalsService,
              private clientCallService: ClientCallService) {

    this.service = $scope.service
    this.serviceOwner = $scope.owner

    if (this.service) {
      this.consultationPrice = this.service.price.amount / this.moneyDivider
      this.serviceName = this.service.name
    }

    if (this.serviceOwner && this.serviceOwner.organizationDetails) {
      this.expertAvatar = this.serviceOwner.organizationDetails.logo
      this.serviceOwnerName = this.serviceOwner.organizationDetails.name
    }
    else if (this.serviceOwner && this.serviceOwner.expertDetails) {
      this.serviceOwnerName = this.serviceOwner.expertDetails.name
      this.expertAvatar = this.serviceOwner.expertDetails.avatar
    }

    this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
      this.isLoading = false
      this.paymentMethods = paymentMethods.map((el) => ({
        name: el.cardType + ': ' + el.maskedNumber,
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
      clientBalance.amount = 9999
      this.prepaidCallLimitModel = clientBalance.amount
      this.clientBalance = {
        name: this.prepaidTranslation + ' ' + (clientBalance.amount / this.moneyDivider).toFixed(this.decimal) + ' '
        + clientBalance.currency,
        value: this.prepaidValue
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
    const consultationCost = Number(consultationCostModel.toString().replace(',', '.'))
    this.moneyConverterPerCallTime(consultationCost)
    this.isMinTimeConsultationBeenReached = this.checkIfMinTimeConsultationBeenReached(consultationCost)
    this.isPriceInputIsValid = this.checkIfPriceInputIsValid(consultationCost)
    this.isMaxPriceInputReachedIsValid = this.checkIfMaxPriceInputReachedIsValid(consultationCost)
  }

  private moneyConverterPerCallTime = (model: number): void => {
    const date: Date = new Date(0)
    date.setSeconds(model / this.consultationPrice * this.secondPerMinute)

    if (model !== 0)
      this.timeCounter = date.toISOString().substr(this.partOfStringTime.start, this.partOfStringTime.length)
    else
      this.timeCounter = 'COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE'
  }

  public onSelectItemDropdown = (data: IPrimaryDropdownListElement): void => {
    this.callLimitModel = 0
    this.timeCounter = 'COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE'

    // TODO Wait for: https://git.contactis.pl/itelo/profitelo/issues/1015
    const input = angular.element('input-price input')[0]
    this.isPrepaid = data.value === this.prepaidValue
    input.focus()
  }

  private checkIfMaxPriceInputReachedIsValid = (model: number): boolean =>
    this.isPrepaid ? ((model <= this.prepaidCallLimitModel / this.moneyDivider)) || model === 0 : model >= 0

  private checkIfPriceInputIsValid = (model: number): boolean =>
    (model && this.priceRegexp.test(model.toString())) || model === 0

  private checkIfMinTimeConsultationBeenReached = (model: number): boolean =>
    this.minTimeCall = this.isPrepaid ? (model / this.consultationPrice) >= this.minTimePrepaid || model === 0 : true
}
