import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {GetPayoutMethodDto} from 'profitelo-api-ng/model/models'
import {JValue} from 'profitelo-api-ng/model/JValue'

export class PayoutsService {

  /* @ngInject */
  constructor(private PayoutsApi: PayoutsApi) {}

  public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => this.PayoutsApi.getPayoutMethodsRoute()

  public putPayoutMethod = (): ng.IPromise<JValue> => this.PayoutsApi.putPayoutMethodRoute({})

}
