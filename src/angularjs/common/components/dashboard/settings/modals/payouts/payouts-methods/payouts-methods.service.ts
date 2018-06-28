// tslint:disable:readonly-array
// tslint:disable:no-shadowed-variable
// tslint:disable:newline-before-return
// tslint:disable:curly
import { JValue } from 'profitelo-api-ng/model/JValue';
import { PayoutsApi } from 'profitelo-api-ng/api/api';
import { PutPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { ErrorHandlerService } from '../../../../../../services/error-handler/error-handler.service';
import { httpCodes } from '../../../../../../classes/http-codes';

// tslint:disable:member-ordering
export class PayoutsMethodsModalService {

  public static $inject = ['PayoutsApi', 'errorHandler'];

    constructor(private PayoutsApi: PayoutsApi,
              private errorHandler: ErrorHandlerService) {}

  public putPayoutMethod = (payoutMethod: PutPayoutMethodDto): ng.IPromise<JValue> => {
    const promise = this.PayoutsApi.putPayoutMethodRoute(payoutMethod);
    promise.catch(error => {
      if (error.status !== httpCodes.badRequest)
        this.errorHandler.handleServerError(error, 'Cannot put payout method');
    });
    return promise;
  }

}
