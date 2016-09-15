(function() {

  /* @ngInject */
  function chooseAmountChargeController($scope, $timeout) {

    this.activeOption = null
    this.minimalAmountValidation = () => {
      return this.cashAmountModel < this.amounts.minimalAmounts.amount / 100 && !angular.element('.option-own-amount').find('input:focus')[0] && this.activeOption === 3
    }
    
    this.selectAmountOption =  (index) => {
      this.activeOption = index
      if (index !== 3) {
        this.amountModel.amount = {
          amount: this.amounts.paymentOptions[index].amount,
          currency: this.amounts.paymentOptions[index].currency
        }

        this.amountModel.cashAmount = null
      } else {
        angular.element('.option-own-amount').find('input').focus()
        $scope.$watch(() =>{
          return this.cashAmountModel
        }, (newValue) =>{
          if (newValue) {
            this.amountModel.cashAmount = {
              amount:  Number(newValue * 100),
              currency: this.amounts.minimalAmounts.currency
            }
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
