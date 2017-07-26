import * as angular from 'angular'
import {InvoiceDataResolver} from '../../../../common/resolvers/invoice-data/invoice-data.resolver'
import {ModalsService} from '../../../../common/services/modals/modals.service'
import filtersModule from '../../../../common/filters/filters'
import 'common/resolvers/invoice-data/invoice-data.resolver'
import apiModule from 'profitelo-api-ng/api.module'
import {PaymentsApi, AccountApi, FinancesApi} from 'profitelo-api-ng/api/api'
import {MoneyDto, CompanyInfo, GetCreditCard, AccountDetails} from 'profitelo-api-ng/model/models'
import {UserService} from '../../../../common/services/user/user.service'
import noResultsInformationModule from '../../../../common/components/dashboard/no-results-information/no-results-information'

export class DashboardSettingsPaymentsController implements ng.IController {
  public isAnyPaymentMethod: boolean
  public accountBalance?: MoneyDto
  public companyName: string
  public vatNumber: string
  public address: string
  public paymentMethods: Array<GetCreditCard>
  public checkedPaymentMethod?: string
  public isLongAddress?: boolean
  public isClientBalanceLoaded: boolean = false
  public isCreditCardsLoaded: boolean = false

  constructor(getInvoiceData: CompanyInfo, PaymentsApi: PaymentsApi, private AccountApi: AccountApi,
              private modalsService: ModalsService, FinancesApi: FinancesApi,
              private $state: ng.ui.IStateService, user: AccountDetails) {

    if (getInvoiceData) {
      this.isAnyPaymentMethod = true
      this.companyName = getInvoiceData.companyName
      this.vatNumber = getInvoiceData.vatNumber
      if (getInvoiceData.address) {
        this.address = getInvoiceData.address.street + ', ' + getInvoiceData.address.number +
          ', ' + getInvoiceData.address.zipCode + ', ' + getInvoiceData.address.city + ', ' +
          getInvoiceData.address.countryISO
        this.isLongAddress = this.address.length > 10
      }
    }

    FinancesApi.getClientBalanceRoute().then((clientBalance: MoneyDto) => {
      this.accountBalance = clientBalance
    }, (error) => {
      throw new Error('Can not get user balance: ' + error)
    }).finally(() => {
      this.isClientBalanceLoaded = true
    })

    this.checkedPaymentMethod = user.defaultCreditCard

    PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
      this.paymentMethods = paymentMethods
      if (this.paymentMethods.length > 0) {
        this.isAnyPaymentMethod = true
      }
    }, (error) => {
      if (error.status !== 404) {
        throw new error('Can not get user payment methods: ' + error)
      }
    }).finally(() => {
      this.isCreditCardsLoaded = true
    })
  }

  public changeDefaultPaymentMethod = (token?: string): void => {
    this.AccountApi.changeDefaultPaymentMethodRoute({
      token: token
    }).then(() => {

    }, (error) => {
      throw new Error('Can not change default payment method ' + error)
    })
  }

  public editInvoiceDetails = (): void => {
    this.modalsService.createEditCompanyInvoiceControllerModal(this.onModalClose)
  }

  public addNewPaymentMethod = (): void => {
    this.modalsService.createAddPaymentMethodControllerModal(this.onModalClose)
  }

  public addFirstTimePaymentMethod = (): void => {
    this.$state.go('app.dashboard.charge-account')
  }

  private onModalClose = (): void => {
    this.$state.reload()
  }

}

angular.module('profitelo.controller.dashboard.settings.payments', [
  'ui.router',
  apiModule,
  'profitelo.services.user',
  'profitelo.filters.money',
  'profitelo.components.interface.preloader-container',
  filtersModule,
  'profitelo.resolvers.invoice-data',
  noResultsInformationModule
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.payments', {
      url: '/payments',
      template: require('./payments.pug')(),
      controller: 'dashboardSettingsPaymentsController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: (invoiceDataResolver: InvoiceDataResolver): ng.IPromise<CompanyInfo> => {
          return invoiceDataResolver.resolveCompanyInfo()
        },
        user: (userService: UserService): ng.IPromise<AccountDetails> => {
          return userService.getUser(true)
        }
      }
    })
  })
  .controller('dashboardSettingsPaymentsController', DashboardSettingsPaymentsController)
