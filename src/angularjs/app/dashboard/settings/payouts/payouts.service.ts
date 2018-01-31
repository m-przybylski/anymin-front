import { PayoutsApi } from 'profitelo-api-ng/api/api';
import { GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { JValue } from 'profitelo-api-ng/model/JValue';
import { httpCodes } from '../../../../common/classes/http-codes';
import { ErrorHandlerService } from '../../../../common/services/error-handler/error-handler.service';

export class PayoutsService {

  static $inject = ['PayoutsApi', '$log', 'errorHandler'];

    constructor(private PayoutsApi: PayoutsApi,
              private $log: ng.ILogService,
              private errorHandler: ErrorHandlerService) {}

  public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto> => {
    const promise = this.PayoutsApi.getPayoutMethodsRoute();
    promise.catch(error => {
      if (error.status !== httpCodes.notFound) {
        this.$log.error('Can not get payouts methods', error);
      }
    });
    return promise;
  }

  public putPayoutMethod = (): ng.IPromise<JValue> => {
    const promise = this.PayoutsApi.putPayoutMethodRoute({});
    promise.catch(error => {
      this.errorHandler.handleServerError(error, 'Can not delete payout method');
    });
    return promise;
  }

}
