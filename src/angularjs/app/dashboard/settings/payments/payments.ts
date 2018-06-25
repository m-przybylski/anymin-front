import * as angular from 'angular';
import { InvoiceDataResolver } from '../../../../common/resolvers/invoice-data/invoice-data.resolver';
import { ModalsService } from '../../../../common/services/modals/modals.service';
import filtersModule from '../../../../common/filters/filters';
import 'angularjs/common/resolvers/invoice-data/invoice-data.resolver';
import apiModule from 'profitelo-api-ng/api.module';
import { PaymentsApi, FinancesApi } from 'profitelo-api-ng/api/api';
import { MoneyDto, GetCompanyInvoiceDetails, GetCreditCard, AccountDetails } from 'profitelo-api-ng/model/models';
import { UserService } from '../../../../common/services/user/user.service';
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information';
import { httpCodes } from '../../../../common/classes/http-codes';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class DashboardSettingsPaymentsController implements ng.IController {
  public isAnyPaymentMethod: boolean;
  public accountBalance?: MoneyDto;
  public companyName: string;
  public vatNumber: string;
  public address: string;
  public paymentMethods: GetCreditCard[];
  public checkedPaymentMethod?: string;
  public isLongAddress?: boolean;
  public isClientBalanceLoaded = false;
  public isCreditCardsLoaded = false;
  private static readonly maxShortAddressLength = 10;

  public static $inject = ['getInvoiceData', 'FinancesApi', '$log', 'PaymentsApi', 'modalsService', '$state'];

  constructor(getInvoiceData: void | GetCompanyInvoiceDetails,
              FinancesApi: FinancesApi,
              $log: ng.ILogService,
              private PaymentsApi: PaymentsApi,
              private modalsService: ModalsService,
              private $state: StateService) {

    if (getInvoiceData) {
      this.isAnyPaymentMethod = true;
      this.companyName = getInvoiceData.companyName;
      this.vatNumber = getInvoiceData.vatNumber;
      if (getInvoiceData.address) {
        this.address = getInvoiceData.address.address + ', ' + getInvoiceData.address.postalCode +
          ', ' + getInvoiceData.address.city + ', ' + getInvoiceData.address.countryISO;
        this.isLongAddress = this.address.length > DashboardSettingsPaymentsController.maxShortAddressLength;
      }
    }

    FinancesApi.getClientBalanceRoute().then((clientBalance: MoneyDto) => {
      this.accountBalance = clientBalance;
      if (clientBalance.amount !== 0) this.isAnyPaymentMethod = true;
    }, (error) => {
      throw new Error('Can not get user balance: ' + String(error));
    }).finally(() => {
      this.isClientBalanceLoaded = true;
    });

    PaymentsApi.getCreditCardsRoute().then((paymentMethods) => {
      this.paymentMethods = paymentMethods;
      if (this.paymentMethods.length > 0) {
        this.isAnyPaymentMethod = true;
      }
      PaymentsApi.getDefaultPaymentMethodRoute().then((response) => {
        if (response.card) {
          this.checkedPaymentMethod = response.card.id;
        }
      }, (error) => {
        $log.error(error);
      });
    }, (error) => {
      if (error.status !== httpCodes.notFound) {
        throw new error('Can not get user payment methods: ' + String(error));
      }
    }).finally(() => {
      this.isCreditCardsLoaded = true;
    });
  }

  public changeDefaultPaymentMethod = (token?: string): void => {
    this.PaymentsApi.putDefaultPaymentMethodRoute({creditCardId: token}).then(() => {
    }, (error) => {
      throw new Error('Can not change default payment method ' + String(error));
    });
  }

  public editInvoiceDetails = (): void => {
    this.modalsService.createEditCompanyInvoiceControllerModal(this.onModalClose);
  }

  public addNewPaymentMethod = (): void => {
    this.modalsService.createAddPaymentMethodControllerModal(this.onModalClose);
  }

  public addFirstTimePaymentMethod = (): void => {
    this.$state.go('app.charge-account');
  }

  private onModalClose = (): void => {
    this.$state.reload();
  }

}

const paymentsSettingsModule = angular.module('profitelo.controller.dashboard.settings.payments', [
  apiModule,
  'profitelo.services.user',
  'profitelo.filters.money',
  'profitelo.components.interface.preloader-container',
  filtersModule,
  uiRouter,
  'profitelo.resolvers.invoice-data',
  noResultsInformationModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.settings.payments', {
      url: '/payments',
      template: require('./payments.html'),
      controller: 'dashboardSettingsPaymentsController',
      controllerAs: 'vm',
      resolve: {
        getInvoiceData: ['invoiceDataResolver',
          (invoiceDataResolver: InvoiceDataResolver): ng.IPromise<void | GetCompanyInvoiceDetails> =>
            invoiceDataResolver.resolveCompanyInfo()],
        user: ['userService', (userService: UserService): ng.IPromise<AccountDetails> => userService.getUser(true)]
      }
    });
  }])
  .controller('dashboardSettingsPaymentsController', DashboardSettingsPaymentsController)
  .name;

export default paymentsSettingsModule;
