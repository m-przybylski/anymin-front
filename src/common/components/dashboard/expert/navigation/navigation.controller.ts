import {IExpertNavigationComponentBindings} from './navigation'
import {FinancesApi} from 'profitelo-api-ng/api/api'
import {MoneyDto} from 'profitelo-api-ng/model/models'
export class ExpertNavigationComponentController implements IExpertNavigationComponentBindings {

  public clientBalance: MoneyDto

  /* @ngInject */
  constructor(FinancesApi: FinancesApi) {
    FinancesApi.getClientBalanceRoute().then((clientBalance) => {
      this.clientBalance = clientBalance
    }, (error) => {
        throw new Error('Can not get client balance: ' + error)
    })
  }
}
