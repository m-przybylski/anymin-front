(function() {

  /* @ngInject */
  function chooseAmountChargeController($timeout) {

    this.activeOption = 0
    this.minimalAmountValidation = () => {
      return this.amountModal < this.amounts.minimalAmounts / 100 && !this.focusInput && this.activeOption === 3
    }
  }

  let chooseAmountCharge = {
    templateUrl: 'components/dashboard/charge-account/choose-amount-charge/choose-amount-charge.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@',
      amounts: '<'
    },
    controller: chooseAmountChargeController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.choose-amount-charge', [])
    .component('chooseAmountCharge', chooseAmountCharge)

}())
