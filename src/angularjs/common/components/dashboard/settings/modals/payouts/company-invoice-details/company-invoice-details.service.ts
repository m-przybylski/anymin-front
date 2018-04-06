import { AccountApi } from 'profitelo-api-ng/api/api';
import { GetCompanyInvoiceDetails, PostCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';
import { ErrorHandlerService } from '../../../../../../services/error-handler/error-handler.service';
import { httpCodes } from '../../../../../../classes/http-codes';

export class CompanyInvoiceDetailsModalService {

  public static $inject = ['AccountApi', 'errorHandler'];

  constructor(private AccountApi: AccountApi,
              private errorHandler: ErrorHandlerService) {
  }

  public saveInvoiceDetails =
    (companyInvoiceDetails: PostCompanyInvoiceDetails): ng.IPromise<GetCompanyInvoiceDetails> => {
      const promise = this.AccountApi.postCompanyPayoutInvoiceDetailsRoute(companyInvoiceDetails);
      promise.catch(error => {
        if (error.status !== httpCodes.badRequest)
          this.errorHandler.handleServerError(error, 'Can not post payout invoice details');
      });
      return promise;
    }

}
