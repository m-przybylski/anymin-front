
namespace profitelo.dashboard.settings.payments {

  import IModalsService = profitelo.services.modals.IModalsService
  import MoneyDto = profitelo.api.MoneyDto
  import IInvoiceDataResolver = profitelo.resolvers.invoiceData.IInvoiceDataResolver
  import IInvoiceData = profitelo.resolvers.invoiceData.IInvoiceData
  import GetCreditCard = profitelo.api.GetCreditCard
  import IPaymentsApi = profitelo.api.IPaymentsApi

  export class DashboardSettingsPaymentsController implements ng.IController {
    public isAnyPaymentMethod: boolean
    public accountBalance: MoneyDto | null
    public companyName : string
    public vatNumber : string
    public address : string
    public paymentMethods: Array<GetCreditCard>
    public isPaymentsMethodLoading: boolean = true

    constructor(getInvoiceData: IInvoiceData, PaymentsApi: IPaymentsApi,
                private modalsService: IModalsService, private $state: ng.ui.IStateService) {

      if (getInvoiceData.companyInfo === null) {
        this.isAnyPaymentMethod = false
      } else {
        this.isAnyPaymentMethod = true
        this.companyName = getInvoiceData.companyInfo.companyName
        this.vatNumber = getInvoiceData.companyInfo.vatNumber
        this.address =  getInvoiceData.companyInfo.address.street + ', ' + getInvoiceData.companyInfo.address.number +
          ', ' + getInvoiceData.companyInfo.address.zipCode + ', ' + getInvoiceData.companyInfo.address.city + ', ' +
          getInvoiceData.companyInfo.address.countryISO
      }

      if (getInvoiceData.clientBalance) {
        this.accountBalance = getInvoiceData.clientBalance
      }

      PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
        this.paymentMethods = paymentMethods
        this.isPaymentsMethodLoading = false
        if (this.paymentMethods.length > 0) {
          this.isAnyPaymentMethod = true
        }
      }, (error) => {
        this.isPaymentsMethodLoading = false
        if (error.status !== 404) {
          throw new error('Can not get user payment methods: ' + error)
        }
      })


    }

    public onSelectPaymentMethod = () => {
    }

    public editInvoiceDetails = () : void => {
      this.modalsService.createEditCompanyInvoiceControllerModal(this.onModalClose)
    }

    public addNewPaymentMethod = () : void => {
      this.modalsService.createAddPaymentMethodControllerModal(this.onModalClose)
    }

    private onModalClose = (): void => {
      this.$state.reload()
    }

  }

  angular.module('profitelo.controller.dashboard.settings.payments', [
    'ui.router',
    'profitelo.api.PaymentsApi',
    'profitelo.filters.money',
    'profitelo.components.interface.preloader-container',
    'profitelo.resolvers.invoice-data'
  ])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.payments', {
      url: '/payments',
      templateUrl: 'dashboard/settings/payments/payments.tpl.html',
      controller: 'dashboardSettingsPaymentsController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: (InvoiceDataResolver: IInvoiceDataResolver) => {
          return InvoiceDataResolver.resolve()
        }
      }
    })
  })
  .controller('dashboardSettingsPaymentsController', DashboardSettingsPaymentsController)
}
