import { IChooseAmountChargeComponentBindings } from './choose-amount-charge';
import { IAmounts, IAmountModel } from '../../../../../app/charge-account/modal/charge-account.controller';
import { CommonSettingsService } from '../../../../services/common-settings/common-settings.service';
import * as angular from 'angular';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
// tslint:disable:member-ordering
// tslint:disable:strict-type-predicates
export class ChooseAmountChargeComponentController implements IChooseAmountChargeComponentBindings, ng.IController {
  public title: string;
  public amounts: IAmounts;
  public amountModel: IAmountModel;
  public scrollHandler: (slideTo?: number) => void;
  public currentSection: number;
  public activeOption: null | number;
  public firstSelect: boolean;
  public cashAmountModel: number | null;
  public minimalPaymentAmount: number;
  public amountModifier = 1;
  public userAmountOption = 3;

  public static $inject = ['$scope', 'CommonSettingsService'];

    constructor(private $scope: ng.IScope, CommonSettingsService: CommonSettingsService) {

    this.amountModifier = CommonSettingsService.localSettings.amountMultiplier;

    this.activeOption = null;
    this.firstSelect = this.activeOption !== null;
  }

  public $onInit = (): void => {
    this.minimalPaymentAmount = this.amounts.minimalAmounts.amount / this.amountModifier;

    if (angular.isDefined(this.amountModel.amount) && this.amountModel.amount !== null) {

      const paymentOption = _.find(this.amounts.paymentOptions, {amount: this.amountModel.amount.amount});
      if (paymentOption) {
        this.activeOption = this.amounts.paymentOptions.indexOf(paymentOption);
      }
    } else if (this.amountModel.cashAmount !== null) {
      this.activeOption = this.userAmountOption;
      this.cashAmountModel = this.amountModel.cashAmount.amount / this.amountModifier;
    }

    this.$scope.$watch(() => this.cashAmountModel, (newValue) => {
      if (newValue) {
        this.amountModel.cashAmount = {
          amount: Number(newValue * this.amountModifier),
          currency: this.amounts.minimalAmounts.currency
        };

        if (!this.firstSelect) {
          ++this.currentSection;
          this.firstSelect = true;
        }

        this.amountModel.amount = null;
      }
    });
  }

  public onEnter = (): void => {
    const sectionToScroll = 2;
    if (this.amounts && this.amounts.minimalAmounts && this.cashAmountModel &&
      this.cashAmountModel > this.amounts.minimalAmounts.amount / this.amountModifier) {
      this.scrollHandler(sectionToScroll);
    }
    angular.element('.option-own-amount').find('input').blur();
  }

  public selectAmountOption = (index: number): void => {
    this.activeOption = index;
    if (index !== this.userAmountOption) {
      this.cashAmountModel = null;
      if (!this.firstSelect) {
        this.scrollHandler();
        this.firstSelect = true;
      }
      this.amountModel.amount = {
        amount: this.amounts.paymentOptions[index].amount,
        currency: this.amounts.paymentOptions[index].currency
      };

      this.amountModel.cashAmount = null;
    } else {
      angular.element('.option-own-amount').find('input').focus();
    }
  }

  public minimalAmountValidation = (): boolean =>
    !!(this.activeOption === this.userAmountOption && this.cashAmountModel &&
    this.cashAmountModel < this.amounts.minimalAmounts.amount / this.amountModifier &&
    !angular.element('.option-own-amount').find('input:focus')[0])
}
