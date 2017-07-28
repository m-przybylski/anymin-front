import {ModalsService} from '../../common/services/modals/modals.service'
import {FinancesApi, PaymentsApi} from 'profitelo-api-ng/api/api'

export class ChargeAccountResolver {

  /* @ngInject */
  constructor(private modalsService: ModalsService,
              private $q: ng.IQService,
              private PaymentsApi: PaymentsApi,
              private FinancesApi: FinancesApi) {
  }

  public resolve = (currentStateName?: string): void => {
    this.$q.all([
      this.PaymentsApi.getPaymentOptionsRoute(),
      this.PaymentsApi.getCreditCardsRoute(),
      this.PaymentsApi.getPayUPaymentLinksRoute(),
      this.FinancesApi.getClientBalanceRoute()
    ]).then((values) => {
      this.modalsService.createChargeAccountModal(currentStateName, values[0], values[1], values[2], values[3])
    })
  }

}
