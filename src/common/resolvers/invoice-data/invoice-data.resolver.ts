import * as angular from 'angular'
import ILogService = angular.ILogService
import {GetInvoiceDetails} from 'profitelo-api-ng/model/models'
import {AccountApi} from 'profitelo-api-ng/api/api'
import apiModule from 'profitelo-api-ng/api.module'
import {httpCodes} from '../../classes/http-codes'

export interface IInvoiceDataResolver {
  resolveCompanyInfo: () => ng.IPromise<void | GetInvoiceDetails>
}

export class InvoiceDataResolver implements IInvoiceDataResolver {
  constructor(private AccountApi: AccountApi, private $log: ILogService) {
  }

  public resolveCompanyInfo = (): ng.IPromise<void | GetInvoiceDetails> =>
    this.AccountApi.getInvoiceDetailsRoute().then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)

  private onGetCompanyInfoRoute = (invoiceDetails: GetInvoiceDetails): GetInvoiceDetails => invoiceDetails

  private onGetCompanyInfoRouteError = (error: any): void => {
    if (error.status !== httpCodes.notFound) {
      this.$log.error('Can not get company info: ' + error)
    }
    return void 0
  }
}

angular.module('profitelo.resolvers.invoice-data', [
  apiModule
])
.config(($qProvider: ng.IQProvider) => {
  $qProvider.errorOnUnhandledRejections(false)
})
.service('invoiceDataResolver', InvoiceDataResolver)
