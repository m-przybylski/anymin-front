import * as angular from 'angular'
import IPromise = angular.IPromise
import ILogService = angular.ILogService
import {CompanyInfo} from 'profitelo-api-ng/model/models'
import {AccountApi} from 'profitelo-api-ng/api/api'

export interface IInvoiceDataResolver {
  resolveCompanyInfo: () =>  IPromise<CompanyInfo>
}

export class InvoiceDataResolver implements IInvoiceDataResolver {
  constructor(private AccountApi: AccountApi, private $log: ILogService) {
  }

  public resolveCompanyInfo = (): IPromise<CompanyInfo> => {
    return this.AccountApi.getCompanyInfoRoute().then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)
  }

  private onGetCompanyInfoRoute = (companyInfo: CompanyInfo) => {
    return companyInfo
  }
  private onGetCompanyInfoRouteError = (error: any) => {
    if (error.status !== 404) {
      this.$log.error('Can not get company info: ' + error)
    }
  }
}

angular.module('profitelo.resolvers.invoice-data', [])
.config(($qProvider: ng.IQProvider) => {
  $qProvider.errorOnUnhandledRejections(false)
})
.service('invoiceDataResolver', InvoiceDataResolver)
