import {JValue} from 'profitelo-api-ng/model/JValue'
import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {PutPayoutMethodDto} from 'profitelo-api-ng/model/models';

export class PayoutsModalService {

  /* @ngInject */
  constructor(private PayoutsApi: PayoutsApi) {}

  public putPayoutMethod = (payoutMethod: PutPayoutMethodDto): ng.IPromise<JValue> =>
    this.PayoutsApi.putPayoutMethodRoute(payoutMethod)

}
