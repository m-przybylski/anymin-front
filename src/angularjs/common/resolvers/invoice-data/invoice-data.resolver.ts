import * as angular from 'angular';
import ILogService = angular.ILogService;
import { GetCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';
import { AccountApi } from 'profitelo-api-ng/api/api';
import apiModule from 'profitelo-api-ng/api.module';
import { httpCodes } from '../../classes/http-codes';

export interface IInvoiceDataResolver {
  resolveCompanyInfo: () => ng.IPromise<void | GetCompanyInvoiceDetails>;
}

// tslint:disable:member-ordering
export class InvoiceDataResolver implements IInvoiceDataResolver {
  public static $inject = ['AccountApi', '$log'];

  constructor(private AccountApi: AccountApi, private $log: ILogService) {
  }

  public resolveCompanyInfo = (): ng.IPromise<void | GetCompanyInvoiceDetails> =>
    this.AccountApi.getCompanyPayoutInvoiceDetailsRoute()
      .then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)

  private onGetCompanyInfoRoute = (invoiceDetails: GetCompanyInvoiceDetails): GetCompanyInvoiceDetails =>
    invoiceDetails

  private onGetCompanyInfoRouteError = (error: any): void => {
    if (error.status !== httpCodes.notFound) {
      this.$log.error('Can not get company info: ' + String(error));
    }
    return void 0;
  }
}

angular.module('profitelo.resolvers.invoice-data', [
  apiModule
])
.config(['$qProvider', ($qProvider: ng.IQProvider): any => {
  $qProvider.errorOnUnhandledRejections(false);
}])
.service('invoiceDataResolver', InvoiceDataResolver);
