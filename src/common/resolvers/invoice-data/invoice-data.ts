namespace profitelo.resolvers.invoiceData {

  import IAccountApi = profitelo.api.IAccountApi
  import IFinancesApi = profitelo.api.IFinancesApi
  import ILogService = angular.ILogService
  import IPromise = angular.IPromise
  import CompanyInfo = profitelo.api.CompanyInfo
  import MoneyDto = profitelo.api.MoneyDto
  import IPaymentsApi = profitelo.api.IPaymentsApi

  export interface IInvoiceData {
    companyInfo: CompanyInfo | null,
    clientBalance: MoneyDto | null
  }

  export interface IInvoiceDataResolver {
    resolve: () =>  IPromise<IInvoiceData>
  }

  export class InvoiceDataResolver implements IInvoiceDataResolver {

    constructor(private AccountApi: IAccountApi, private FinancesApi: IFinancesApi,
                private PaymentsApi: IPaymentsApi, private $log: ILogService) {}

    public resolve = (): IPromise<IInvoiceData> => {
      return this.AccountApi.getCompanyInfoRoute().then(this.onGetCompanyInfoRoute, this.onGetCompanyInfoRouteError)
    }

    private onGetCompanyInfoRoute = (companyInfo: CompanyInfo) => {
      return this.FinancesApi.getClientBalanceRoute().then((clientBalance: MoneyDto) => {
        return {
          companyInfo: companyInfo,
          clientBalance: clientBalance
        }

      }, (error: any) => {
        this.$log.error('Can not get user balance: ' + error)
        return {
          companyInfo: companyInfo,
          clientBalance: null,
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

  angular.module('profitelo.resolvers.invoice-data', [
  ])
  .config(($qProvider: ng.IQProvider) => {
    $qProvider.errorOnUnhandledRejections(false)
  })
  .service('InvoiceDataResolver', InvoiceDataResolver)

}
