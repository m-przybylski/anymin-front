// tslint:disable:no-empty
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
import { CommonSettingsService } from '../../../../../services/common-settings/common-settings.service';
import apiModule from 'profitelo-api-ng/api.module';
import { PaymentsApi, AccountApi } from 'profitelo-api-ng/api/api';
import { SmoothScrollingService } from '../../../../../services/smooth-scrolling/smooth-scrolling.service';
import { TopAlertService } from '../../../../../services/top-alert/top-alert.service';
import { UserService } from '../../../../../services/user/user.service';
import * as angular from 'angular';
import userModule from '../../../../../services/user/user';
import { IPrimaryDropdownListElement } from '../../../../interface/dropdown-primary/dropdown-primary';
import topAlertModule from '../../../../../services/top-alert/top-alert';
import commonSettingsModule from '../../../../../services/common-settings/common-settings';
import smoothScrollingModule from '../../../../../services/smooth-scrolling/smooth-scrolling';
import { IWindowService } from '../../../../../services/window/window.service';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import checkboxModule from '../../../../interface/checkbox/checkbox';
import inputModule from '../../../../interface/input/input';
import chooseBankModule from '../../choose-bank/choose-bank';
import { StateService } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import { CommonConfig } from '../../../../../../../common-config';
// tslint:disable:no-use-before-declare
// tslint:disable:strict-type-predicates
function payuPaymentFormController($log: ng.ILogService, $window: IWindowService, $state: StateService,
                                   PaymentsApi: PaymentsApi, userService: UserService, topAlertService: TopAlertService,
                                   smoothScrollingService: SmoothScrollingService, AccountApi: AccountApi,
                                   CommonSettingsService: CommonSettingsService,
                                   $scope: ng.IScope, $element: JQuery): void {

  let isPending = false;
  this.isGetCompanyInfo = false;
  this.firstNameModel = '';
  this.lastNameModel = '';
  this.rulesAccepted = false;
  this.isRequired = true;
  this.showInvoiceForm = false;
  this.bankModel = void 0;
  this.countryList = [{
    name: 'Poland',
    value: 'PL'
  }];
  this.onEnter = (option: number): void => {
    const lastOption = 3;
    if (option < lastOption) {
      $('[data-index="' + (option + 1).toString() + '"] input').focus();
    }
  };
  this.countryISO = '';

  this.onSelectCountry = (selectedCountry: IPrimaryDropdownListElement): void => {
    this.countryISO = selectedCountry.value;
  };

  this.scrollOnBankSelect = (): void => {
    const personalDataElement: Element = $element.find('#personal-data')[0];
    smoothScrollingService.simpleScrollTo(personalDataElement);
  };

  // FIXME on new checkbox component
  $scope.$watch(() => this.showInvoiceForm, (newValue: boolean) => {
    if (newValue && !this.isGetCompanyInfo) {
      AccountApi.getCompanyPayoutInvoiceDetailsRoute().then((response) => {
        this.vatNumber = response.vatNumber;
        this.companyName = response.companyName;
        this.address = response.address.address;
        this.postalCode = response.address.postalCode;
        this.city = response.address.city;
        this.isGetCompanyInfo = true;
        this.selectedCountry = _.find(
          this.countryList, (countryListElement: { value: string, name: string }) =>
            countryListElement.value === response.address.countryISO);
        this.countryISO = this.selectedCountry.value;
      }, (error) => {
        if (error.status === '404') {
          this.isGetCompanyInfo = true;
        } else {
          throw new Error('Can not get company info: ' + String(error));
        }
      });
    }
  });

  this.sendPayment = (): void => {
    if (isValid() && !isPending) {

      this.sendPaymentObject = {
        email: this.emailModel,
        continueUrl: CommonConfig.getCommonConfig().urls.frontend + '/dashboard/client/activities',
        payment: {
          amount: this.amountMethodModal.amountModel.cashAmount,
          paymentCountryId: this.paymentCountryId,
          paymentOption: this.amountMethodModal.amountModel.amount,
          paymentSystemId: this.amountMethodModal.paymentSystemModel.id
        },
        lastName: this.lastNameModel,
        firstName: this.firstNameModel,
        payMethodValue: this.bankModel,
      };

      isPending = true;

      if (this.showInvoiceForm) {
        AccountApi.postCompanyPayoutInvoiceDetailsRoute({
          vatNumber: this.vatNumber,
          companyName: this.companyName,
          // TODO On GUS API Implement
          email: this.emailModel,
          address: {
            address: this.address,
            city: this.city,
            postalCode: this.postalCode,
            countryISO: this.countryISO,
          }
        }).then((_response) => {
          sendPayuOrder();

        }, (error) => {
          isPending = false;
          throw new Error('Can not post company info: ' + String(error));
        });
      } else {
        // FIXME after company info optional fields fix
        AccountApi.postCompanyPayoutInvoiceDetailsRoute({
          vatNumber: '6282232071',
          companyName: String(this.firstNameModel) + ' ' + String(this.lastNameModel),
          // TODO On GUS API Implement
          email: this.emailModel,
          address: {
            address: '',
            city: '',
            postalCode: '32-321',
            countryISO: 'PL',
          }
        }).then((_response) => {
          sendPayuOrder();

        }, (error) => {
          isPending = false;
          throw new Error('Can not post company info: ' + String(error));
        });
      }

    }
  };

  const isValid = (): boolean => {
    // tslint:disable-next-line:cyclomatic-complexity
    const _isModelBankExist = (): boolean => {
      if (!this.bankModel) {
        smoothScrollingService.simpleScrollTo('#bankValid');
        return false;
      } else if (!this.firstNameModel || !this.lastNameModel || !this.emailModel || !this.rulesAccepted) {
        smoothScrollingService.simpleScrollTo('#personal-data');
        return false;
      } else if (this.showInvoiceForm
        && (!this.selectedCountry
          || !this.vatNumber
          || !this.companyName
          || !this.address
          || !this.postalCode
          || !this.city)) {
        return false;
      } else {
        return true;
      }
    };
    if (angular.isDefined(this.validAction)) {
      return this.validAction() && _isModelBankExist();
    } else {
      return _isModelBankExist();
    }
  };

  const sendPayuOrder = (): void => {
    PaymentsApi.postPayUOrderRoute(this.sendPaymentObject).then((response) => {
      isPending = false;
      $window.open(response.redirectUrl, '_self', undefined, true);
    }, (error) => {
      $log.error(error);
      topAlertService.error({
        message: 'error',
        timeout: 4
      });
      typeof this.onPayuOrder === 'function' ? this.onPayuOrder() : $state.go('app.dashboard.client.activities');
    });
  };

  this.patternEmail = CommonSettingsService.localSettings.emailPattern;
  this.patternName = CommonSettingsService.localSettings.alphabetPattern;

  this.$onInit = (): void => {
    this.lastNameModel = '';

    if (angular.isDefined(this.amountMethodModal.payMethodValue)) {
      this.bankModel = this.amountMethodModal.payMethodValue;
    }
    // tslint:disable-next-line:cyclomatic-complexity
    userService.getUser().then(user => {
      if (angular.isDefined(this.amountMethodModal.firstName)) {
        this.firstNameModel = this.amountMethodModal.firstName;
      }

      if (angular.isDefined(this.amountMethodModal.lastName)) {
        this.lastNameModel = this.amountMethodModal.lastName;
      }

      if (angular.isDefined(this.amountMethodModal.email)) {
        this.emailModel = this.amountMethodModal.email;
      } else if (angular.isDefined(user.email) && user.email !== null) {
        this.emailModel = user.email;
      } else if (angular.isDefined(user.unverifiedEmail) && user.unverifiedEmail !== null) {
        this.emailModel = user.unverifiedEmail;
      }
    });
  };

  this.checkIsEmailValid = (): boolean =>
    this.patternEmail.test(this.emailModel);

  return this;
}

const payuPaymentForm = {
  template: require('./payu.html'),
  transclude: true,
  bindings: {
    paymentsLinks: '=?',
    validAction: '=?',
    amountMethodModal: '=?',
    paymentCountryId: '=?'
  },
  controller: ['$log', '$window', '$state', 'PaymentsApi', 'userService', 'topAlertService', 'smoothScrollingService',
    'AccountApi', 'CommonSettingsService', '$scope', '$element', payuPaymentFormController],
  controllerAs: '$ctrl'
};

angular.module('profitelo.components.dashboard.charge-account.payment-method.payu', [
  apiModule,
  topAlertModule,
  commonSettingsModule,
  smoothScrollingModule,
  userModule,
  uiRouter,
  chooseBankModule,
  'profitelo.components.dashboard.charge-account.summary-charge-account',
  checkboxModule,
  inputModule
])
  .component('payuPaymentForm', payuPaymentForm);
