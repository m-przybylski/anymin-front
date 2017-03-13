import * as angular from "angular"
import {MoneyDto} from "../../../../common/api/model/MoneyDto"
import {GetCreditCard} from "../../../../common/api/model/GetCreditCard"
import {IInvoiceData, InvoiceDataResolver} from "../../../../common/resolvers/invoice-data/invoice-data.resolver"
import {ModalsService} from "../../../../common/services/modals/modals.service"
import filtersModule from "../../../../common/filters/filters"
import "common/resolvers/invoice-data/invoice-data.resolver"
import apiModule from "../../../../common/api/api.module"
import {UserService} from "../../../../common/services/user/user.service"
import {AccountDetails} from "../../../../common/api/model/AccountDetails"
import {AccountApi} from "../../../../common/api/api/AccountApi"
import {PaymentsApi} from "../../../../common/api/api/PaymentsApi"


export class DashboardSettingsPaymentsController implements ng.IController {
  public isAnyPaymentMethod: boolean
  public accountBalance: MoneyDto | null
  public companyName: string
  public vatNumber: string
  public address: string
  public paymentMethods: Array<GetCreditCard>
  public isPaymentsMethodLoading: boolean = true
  public checkedPaymentMethod?: string

  constructor(getInvoiceData: IInvoiceData, PaymentsApi: PaymentsApi, private AccountApi: AccountApi,
              private modalsService: ModalsService, private $state: ng.ui.IStateService, user: AccountDetails) {

    if (getInvoiceData.companyInfo === null) {
      this.isAnyPaymentMethod = false
    } else {
      this.isAnyPaymentMethod = true
      this.companyName = getInvoiceData.companyInfo.companyName
      this.vatNumber = getInvoiceData.companyInfo.vatNumber
      this.address = getInvoiceData.companyInfo.address.street + ', ' + getInvoiceData.companyInfo.address.number +
        ', ' + getInvoiceData.companyInfo.address.zipCode + ', ' + getInvoiceData.companyInfo.address.city + ', ' +
        getInvoiceData.companyInfo.address.countryISO
    }

    if (getInvoiceData.clientBalance) {
      this.accountBalance = getInvoiceData.clientBalance
    }

    this.checkedPaymentMethod = user.defaultCreditCard

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
  'profitelo.resolvers.invoice-data'
])
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state('app.dashboard.settings.payments', {
      url: '/payments',
      template: require('./payments.jade')(),
      controller: 'dashboardSettingsPaymentsController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: (InvoiceDataResolver: InvoiceDataResolver) => {
          return InvoiceDataResolver.resolve()
        },
        user: (userService: UserService) => {
          return userService.getUser(true)
        }
      }
    })
  })
  .controller('dashboardSettingsPaymentsController', DashboardSettingsPaymentsController)
