import * as angular from 'angular'
import ILogService = angular.ILogService
import {CompanyInfo} from 'profitelo-api-ng/model/models'
import {AccountApi} from 'profitelo-api-ng/api/api'
import apiModule from 'profitelo-api-ng/api.module'
import {CommonSettingsService} from '../../services/common-settings/common-settings.service'
import commonSettingsModule from '../../services/common-settings/common-settings'

export interface IInvoiceDataResolver {
  resolveCompanyInfo: () => ng.IPromise<CompanyInfo>
}

export class InvoiceDataResolver implements IInvoiceDataResolver {
  constructor(private AccountApi: AccountApi, private $log: ILogService,
              private CommonSettingsService: CommonSettingsService) {
  }

  public resolveCompanyInfo = (): ng.IPromise<CompanyInfo> => {
    return this.AccountApi.getCompanyInfoRoute().then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)
  }

  private onGetCompanyInfoRoute = (companyInfo: CompanyInfo): CompanyInfo => {
    return companyInfo
  }
  private onGetCompanyInfoRouteError = (error: any): void => {
    if (error.status !== this.CommonSettingsService.errorStatusCodes.fileNotFound) {
      this.$log.error('Can not get company info: ' + error)
    }
    return void 0
  }
}

angular.module('profitelo.resolvers.invoice-data', [
  apiModule,
  commonSettingsModule
])
.config(($qProvider: ng.IQProvider) => {
  $qProvider.errorOnUnhandledRejections(false)
})
.service('invoiceDataResolver', InvoiceDataResolver)
