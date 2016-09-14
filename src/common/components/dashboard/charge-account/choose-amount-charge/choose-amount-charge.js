(function() {

  /* @ngInject */
  function chooseAmountChargeController($scope) {

    this.activeOption = null
    this.minimalAmountValidation = () => {
      return this.cashAmountModel < this.amounts.minimalAmounts / 100 && !this.focusInput && this.activeOption === 3
    }
    
    this.selectAmountOption =  (index) => {
      this.activeOption = index
      if (index !== 3) {
        this.amountModel.amount = this.amounts.paymentOptions[index]
        this.amountModel.cashAmount = null
      } else {
        $scope.$watch(() =>{
          return this.cashAmountModel
        }, (newValue) =>{
          if (newValue) {
            this.amountModel.cashAmount = parseInt(newValue * 100)
            this.amountModel.amount = null
          }
        })
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
      amountModel: '<'
    },
    controller: chooseAmountChargeController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.choose-amount-charge', [])
    .component('chooseAmountCharge', chooseAmountCharge)

}())
