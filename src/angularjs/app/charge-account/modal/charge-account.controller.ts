import * as angular from 'angular';
import {
  MoneyDto,
  PaymentLink,
  PaymentSystem,
  GetCreditCard,
  PostOrder,
  GetPaymentOptions
} from 'profitelo-api-ng/model/models';

import 'angularjs/common/components/interface/preloader/preloader';
import 'angularjs/common/components/braintree-form/braintree-form';
import 'angularjs/common/components/dashboard/charge-account/payment-method/payu/payu';
import 'angularjs/common/components/dashboard/charge-account/payment-method/paypal/paypal';
import 'angularjs/common/components/dashboard/charge-account/payment-method/card/card';
import 'angularjs/common/components/dashboard/charge-account/choose-amount-charge/choose-amount-charge';
import 'angularjs/common/components/dashboard/charge-account/payment-method/payment-method';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { SmoothScrollingService } from '../../../common/services/smooth-scrolling/smooth-scrolling.service';
import { keyboardCodes } from '../../../common/classes/keyboard';
import { StateService, TransitionPromise } from '@uirouter/angularjs';

export interface IAmounts {
  paymentOptions: MoneyDto[];
  minimalAmounts: MoneyDto;
}

export interface IAmountModel {
  cashAmount: null | MoneyDto;
  amount: null | MoneyDto;
}

export interface IChargeAccountScope extends ng.IScope {
  currentState?: string;
  paymentsOptions?: GetPaymentOptions;
  creditCards?: GetCreditCard[];
  paymentsLinks?: PaymentLink[];
  financeBalance?: MoneyDto;
}

export interface IGetLastPayment {
  payload: PostOrder;
  amount: MoneyDto;
  paymentSystemId: string;
}

// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class ChargeAccountController implements ng.IController {

  public static $inject = ['$uibModalInstance', '$state', '$timeout', '$window', 'smoothScrollingService', '$scope'];
  public isNavbar = true;
  public isFullscreen = true;
  public isCreditCard = false;
  public isChargeProfiteloAccount = false;
  public isPaymentCardMethod = false;
  public isBraintreeFormLoaded = false;
  public queue = null;
  public amountModel: IAmountModel = {
    cashAmount: null,
    amount: null
  };
  public paymentCountryId: string;
  public amounts: IAmounts;
  public currentSection: number;
  public clientBalance?: MoneyDto;
  public lastPayment?: IGetLastPayment;
  public paymentSystems: PaymentSystem[];
  public paymentsLinks?: PaymentLink[];
  public amountMethodModal: {
    amountModel: {
      cashAmount: null | MoneyDto,
      amount: null | MoneyDto
    },
    paymentSystemModel: string | null,
    minimalAmount: MoneyDto,
    firstName?: string,
    lastName?: string,
    email?: string,
    payMethodValue?: string
  };
  public lastChargeAccountSectionID = 3;

  public currentState?: string;

  constructor(private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService,
              private $state: StateService,
              private $timeout: ng.ITimeoutService,
              private $window: ng.IWindowService,
              private smoothScrollingService: SmoothScrollingService,
              private $scope: IChargeAccountScope) {

    angular.element(this.$window).keydown((event) => {
      if (event.keyCode === keyboardCodes.escape) {
        this.onModalClose();
      }
    });
  }

  // tslint:disable-next-line:cyclomatic-complexity
  public $onInit(): void {
    this.currentState = this.$scope.currentState;

      const paymentsOptions = this.$scope.paymentsOptions;
      const creditCards = this.$scope.creditCards;
      const paymentsLinks = this.$scope.paymentsLinks;
      const financeBalance = this.$scope.financeBalance;

      if (paymentsOptions) {
        this.paymentCountryId = paymentsOptions.paymentCountryId;
        this.amounts = {
          paymentOptions: paymentsOptions.paymentOptions,
          minimalAmounts: paymentsOptions.minimalPayment
        };
        this.lastPayment = <any>paymentsOptions.lastPayment;
        this.paymentSystems = paymentsOptions.paymentSystems;
      }

      this.currentSection = 1;
      this.clientBalance = financeBalance;
      this.isCreditCard = typeof creditCards !== 'undefined' && creditCards.length > 0;
      this.paymentsLinks = paymentsLinks;

      this.amountMethodModal = {
        amountModel: this.amountModel,
        paymentSystemModel: null,
        minimalAmount: this.amounts.minimalAmounts
      };

      // tslint:disable-next-line:strict-type-predicates
      if (this.lastPayment !== null && (typeof this.lastPayment !== 'undefined')) {
        this.isChargeProfiteloAccount = true;
        this.currentSection = this.lastChargeAccountSectionID;
        if (_.find(this.amounts.paymentOptions, {amount: this.lastPayment.amount.amount})) {
          this.amountModel.amount = this.lastPayment.amount;
        } else {
          this.amountModel.cashAmount = this.lastPayment.amount;
        }
        this.amountMethodModal.paymentSystemModel = this.lastPayment.paymentSystemId;

        if (this.lastPayment && this.lastPayment.payload && this.lastPayment.payload !== null) {
          this.amountMethodModal.firstName = this.lastPayment.payload.firstName;
          this.amountMethodModal.lastName = this.lastPayment.payload.lastName;
          this.amountMethodModal.email = this.lastPayment.payload.email;
          this.amountMethodModal.payMethodValue = this.lastPayment.payload.payMethodValue;
        }
      }
  }

  public $onDestroy = (): void => {
    angular.element(this.$window).keydown('keydown');
  }

  public onLoad = (): void => {
    this.isBraintreeFormLoaded = true;
  }

  public chargeAccountProfiteloPaymentsMethod = (): void => {
    this.isChargeProfiteloAccount = true;
    this.isPaymentCardMethod = false;
  }

  public addPaymentCardMethod = (): void => {
    this.isPaymentCardMethod = true;
    this.isChargeProfiteloAccount = false;
  }

  public onFormSucceed = (): void => {
    this.$state.go('app.dashboard.client.activities');
  }

  public onClose = (): TransitionPromise =>
    this.$state.go('app.dashboard.client.favourites')

  public validAction = (): boolean => {
    if (
      (!angular.isDefined(this.amountModel.amount) || this.amountModel.amount === null) &&
      this.amountModel.cashAmount &&
      this.amountModel.cashAmount.amount < this.amounts.minimalAmounts.amount
    ) {
      this.smoothScrollingService.simpleScrollTo('#cash-valid', true);
      return false;
    } else {
      return true;
    }
  }

  public scrollHandler = (slideTo?: number): void => {
    if (slideTo && angular.isDefined(slideTo)) {
      this.smoothScrollingService.scrollTo(String(slideTo));
      // TODO refactor this 3
    } else if (this.currentSection < this.lastChargeAccountSectionID) {
      this.$timeout(() => {
        this.smoothScrollingService.scrollTo(String(++this.currentSection));
      });
    }
  }

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel');
    if (this.currentState) {
      this.$state.go(this.currentState);
    } else {
      this.$state.go('app.dashboard.client.activities');
    }
  }
}
