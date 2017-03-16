import * as angular from "angular"
import {IAmounts, IAmountModel} from "../../../../../app/dashboard/charge-account/charge-account"
import {CommonSettingsService} from "../../../../services/common-settings/common-settings.service"

export interface IChooseAmountChargeComponentBindings {
  title: string
  amounts: IAmounts
  amountModel: IAmountModel
  scrollHandler: (slideTo?: number) => void
  currentSection: number
}

export class ChooseAmountChargeComponentController implements IChooseAmountChargeComponentBindings, ng.IController {
  title: string
  amounts: IAmounts
  amountModel: IAmountModel
  scrollHandler: (slideTo?: number) => void
  currentSection: number
  activeOption: null | number
  firstSelect: boolean
  cashAmountModel: number | null
  minimalPaymentAmount: number
  amountModifier: number = 1

  /* @ngInject */
  constructor(private $scope: ng.IScope, CommonSettingsService: CommonSettingsService, private lodash: _.LoDashStatic) {

    this.amountModifier = CommonSettingsService.localSettings.amountMultiplier

    this.activeOption = null
    this.firstSelect = this.activeOption !== null
  }

  $onInit = () => {
    this.minimalPaymentAmount = this.amounts.minimalAmounts.amount / this.amountModifier

    if (angular.isDefined(this.amountModel.amount) && this.amountModel.amount !== null) {

      const paymentOption = this.lodash.find(this.amounts.paymentOptions, {'amount': this.amountModel.amount.amount})
      if (paymentOption) {
        this.activeOption = this.amounts.paymentOptions.indexOf(paymentOption)
      }
    } else if (this.amountModel.cashAmount !== null) {
      this.activeOption = 3
      this.cashAmountModel = this.amountModel.cashAmount.amount / this.amountModifier
    }

    this.$scope.$watch(() => {
      return this.cashAmountModel
    }, (newValue) => {
      if (newValue) {
        this.amountModel.cashAmount = {
          amount: Number(newValue * this.amountModifier),
          currency: this.amounts.minimalAmounts.currency
        }

        if (!this.firstSelect) {
          ++this.currentSection
          this.firstSelect = true
        }

        this.amountModel.amount = null
      }
    })
  }

  public onEnter = () => {
    if (this.amounts && this.amounts.minimalAmounts && this.cashAmountModel &&
      this.cashAmountModel > this.amounts.minimalAmounts.amount / this.amountModifier) {
      this.scrollHandler(2)
    }
    angular.element('.option-own-amount').find('input').blur()
  }

  public selectAmountOption = (index: number) => {
    this.activeOption = index
    if (index !== 3) {
      this.cashAmountModel = null
      if (!this.firstSelect) {
        this.scrollHandler()
        this.firstSelect = true
      }
      this.amountModel.amount = {
        amount: this.amounts.paymentOptions[index].amount,
        currency: this.amounts.paymentOptions[index].currency
      }

      this.amountModel.cashAmount = null
    } else {
      angular.element('.option-own-amount').find('input').focus()
    }
  }

  public minimalAmountValidation = () => {
    return (this.activeOption === 3 && this.cashAmountModel && this.cashAmountModel <
    this.amounts.minimalAmounts.amount / this.amountModifier && !angular.element('.option-own-amount').find('input:focus')[0])
  }
}

class ChooseAmountChargeComponent implements ng.IComponentOptions {
  template = require('./choose-amount-charge.pug')()
  bindings = {
    title: '@',
    amounts: '<',
    scrollHandler: '<',
    amountModel: '=?',
    currentSection: '=?'
  }
  controller: ng.Injectable<ng.IControllerConstructor> = ChooseAmountChargeComponentController
}

angular.module('profitelo.components.dashboard.charge-account.choose-amount-charge', [
  'profitelo.services.commonSettings',
  'ngLodash'
])
  .component('chooseAmountCharge', new ChooseAmountChargeComponent())
