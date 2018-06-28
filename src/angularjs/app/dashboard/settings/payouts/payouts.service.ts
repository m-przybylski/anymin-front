// tslint:disable:no-shadowed-variable
// tslint:disable:newline-before-return
import { PayoutsApi, AccountApi } from 'profitelo-api-ng/api/api';
import { GetCompanyInvoiceDetails, GetPayoutMethodDto } from 'profitelo-api-ng/model/models';
import { JValue } from 'profitelo-api-ng/model/JValue';
import { httpCodes } from '../../../../common/classes/http-codes';
import { ErrorHandlerService } from '../../../../common/services/error-handler/error-handler.service';

// tslint:disable:member-ordering
export class PayoutsService {

  public static $inject = ['PayoutsApi', '$log', 'errorHandler', 'AccountApi'];

  constructor(private PayoutsApi: PayoutsApi,
            private $log: ng.ILogService,
            private errorHandler: ErrorHandlerService,
            private AccountApi: AccountApi) {}

  public getPayoutMethods = (): ng.IPromise<GetPayoutMethodDto | undefined> =>
    this.PayoutsApi.getPayoutMethodsRoute().catch(error => {
      if (error.status === httpCodes.notFound) {
        return undefined;
      } else {
        this.$log.error('Can not get payouts methods ', error);
        throw error;
      }
    })

  public putPayoutMethod = (): ng.IPromise<JValue> => {
    const promise = this.PayoutsApi.putPayoutMethodRoute({});
    promise.catch(error => {
      this.errorHandler.handleServerError(error, 'Can not delete payout method');
    });
    return promise;
  }

  public getCompanyPayoutsInvoiceDetails = (): ng.IPromise<GetCompanyInvoiceDetails | undefined> =>
    this.AccountApi.getCompanyPayoutInvoiceDetailsRoute().catch(error => {
      if (error.status === httpCodes.notFound) {
        return undefined;
      } else {
        this.$log.error('Can not get company payouts invoice details', error);
        throw error;
        }
    })

}
