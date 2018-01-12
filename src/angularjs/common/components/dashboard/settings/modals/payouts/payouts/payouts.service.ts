import {JValue} from 'profitelo-api-ng/model/JValue'
import {PayoutsApi} from 'profitelo-api-ng/api/api'
import {PutPayoutMethodDto} from 'profitelo-api-ng/model/models';
import {ErrorHandlerService} from '../../../../../../services/error-handler/error-handler.service'

export class PayoutsModalService {

  static $inject = ['PayoutsApi', 'errorHandler'];

    constructor(private PayoutsApi: PayoutsApi,
              private errorHandler: ErrorHandlerService) {}

  public putPayoutMethod = (payoutMethod: PutPayoutMethodDto): ng.IPromise<JValue> => {
    const promise = this.PayoutsApi.putPayoutMethodRoute(payoutMethod)
    promise.catch(error => {
      this.errorHandler.handleServerError(error, 'Cannot put payout method')
    })
    return promise
  }

}
