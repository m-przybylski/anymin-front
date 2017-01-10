(function () {

  /* @ngInject */
  function chooseAmountChargeController($scope: ng.IScope, CommonSettingsService) {

    this.$onInit = () => {
      this.minimalPaymentAmount = this.amounts.minimalAmounts.amount / amountModifier

      if (angular.isDefined(this.amountModel.amount) && this.amountModel.amount !== null) {
        this.activeOption = this.amounts.paymentOptions.indexOf(_.find(this.amounts.paymentOptions, {'amount': this.amountModel.amount.amount}))
      } else if (this.amountModel.cashAmount !== null) {
        this.activeOption = 3
        this.cashAmountModel = this.amountModel.cashAmount.amount / amountModifier
      }
    }

    const amountModifier = CommonSettingsService.localSettings.amountMultiplier

    this.activeOption = null
    this.firstSelect = this.activeOption !== null

    this.minimalAmountValidation = () => {
      return this.activeOption === 3 && this.cashAmountModel < this.amounts.minimalAmounts.amount / amountModifier && !angular.element('.option-own-amount').find('input:focus')[0]
    }

    $scope.$watch(() => {
      return this.cashAmountModel
    }, (newValue) => {
      if (newValue) {
        this.amountModel.cashAmount = {
          amount: Number(newValue * amountModifier),
          currency: this.amounts.minimalAmounts.currency
        }

        if (!this.firstSelect) {
          ++this.currentSection
          this.firstSelect = true
        }

        this.amountModel.amount = null
      }
    })

    this.onEnter = () => {
      if (this.cashAmountModel > this.amounts.minimalAmounts.amount / amountModifier) {
        this.scrollHandler(2)
      }
      angular.element('.option-own-amount').find('input').blur()
    }

    this.selectAmountOption = (index) => {
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

    return this
  }

  let chooseAmountCharge = {
    templateUrl: 'components/dashboard/charge-account/choose-amount-charge/choose-amount-charge.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@',
      amounts: '<',
      scrollHandler: '<',
      amountModel: '=?',
      currentSection: '=?'
    },
    controller: chooseAmountChargeController,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.charge-account.choose-amount-charge', [
    'profitelo.services.commonSettings'
  ])
  .component('chooseAmountCharge', chooseAmountCharge)

}())