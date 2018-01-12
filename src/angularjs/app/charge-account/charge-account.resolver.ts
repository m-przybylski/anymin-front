import {ModalsService} from '../../common/services/modals/modals.service'
import {FinancesApi, PaymentsApi} from 'profitelo-api-ng/api/api'

export class ChargeAccountResolver {

  static $inject = ['modalsService', '$q', 'PaymentsApi', 'FinancesApi'];

    constructor(private modalsService: ModalsService,
              private $q: ng.IQService,
              private PaymentsApi: PaymentsApi,
              private FinancesApi: FinancesApi) {
  }

  public resolve = (currentStateName?: string): void => {
    const indexOfPaymentOptions = 0
    const indexOfCreditCards = 1
    const indexOfPayUPaymentLinks = 2
    const indexOfClientBalance = 3
    this.$q.all([
      this.PaymentsApi.getPaymentOptionsRoute(),
      this.PaymentsApi.getCreditCardsRoute(),
      this.PaymentsApi.getPayUPaymentLinksRoute(),
      this.FinancesApi.getClientBalanceRoute()
    ]).then((values) => {
      this.modalsService.createChargeAccountModal(currentStateName, values[indexOfPaymentOptions],
        values[indexOfCreditCards], values[indexOfPayUPaymentLinks], values[indexOfClientBalance])
    })
  }

}
