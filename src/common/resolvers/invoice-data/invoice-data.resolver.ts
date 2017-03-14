import * as angular from "angular"
import {FinancesApi, AccountApi, PaymentsApi} from "profitelo-api-ng/api/api"
import {CompanyInfo, MoneyDto, GetCreditCard} from "profitelo-api-ng/model/models"

export interface IInvoiceData {
  companyInfo: CompanyInfo | null,
  clientBalance: MoneyDto | null,
  paymentMethods: Array<GetCreditCard> | null
}


export class InvoiceDataResolver {

  constructor(private AccountApi: AccountApi, private FinancesApi: FinancesApi,
              private PaymentsApi: PaymentsApi, private $log: ng.ILogService) {
  }

  public resolve = (): ng.IPromise<IInvoiceData> => {
    return this.AccountApi.getCompanyInfoRoute().then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)
  }

  private onGetCompanyInfoRoute = (companyInfo: CompanyInfo) => {
    return this.FinancesApi.getClientBalanceRoute().then((clientBalance: MoneyDto) => {
      return this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
        return {
          companyInfo: companyInfo,
          clientBalance: clientBalance,
          paymentMethods: paymentMethods
        }
      }, (error) => {
        this.$log.error('Can not get user payment methods: ' + error)
        return {
          companyInfo: companyInfo,
          clientBalance: clientBalance,
          paymentMethods: null
        }
      })
    }, (error: any) => {
      this.$log.error('Can not get user balance: ' + error)
      return {
        companyInfo: companyInfo,
        clientBalance: null,
        paymentMethods: null
      }
    })
  }

  private onGetCompanyInfoRouteError = (error: any) => {
    if (error.status !== 404) {
      this.$log.error('Can not get company info: ' + error)
    }
    return this.FinancesApi.getClientBalanceRoute().then((clientBalance: MoneyDto) => {
      return this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
        return {
          companyInfo: null,
          clientBalance: clientBalance,
          paymentMethods: paymentMethods
        }
      }, (error) => {
        this.$log.error('Can not get user payment methods: ' + error)
        return {
          companyInfo: null,
          clientBalance: clientBalance,
          paymentMethods: null
        }
      })
    }, (error: any) => {
      if (error.status !== 404) {
        this.$log.error('Can not get user balance: ' + error)
      }
      return this.PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
        return {
          companyInfo: null,
          clientBalance: null,
          paymentMethods: paymentMethods
        }
      }, (error) => {
        if (error.status !== 404) {
          this.$log.error('Can not get user payment methods: ' + error)
        }
        return {
          companyInfo: null,
          clientBalance: null,
          paymentMethods: null
        }
      })
    })
  }

}

angular.module('profitelo.resolvers.invoice-data', [])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('InvoiceDataResolver', InvoiceDataResolver)

