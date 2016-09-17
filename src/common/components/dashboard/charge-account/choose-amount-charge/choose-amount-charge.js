(function() {

  /* @ngInject */
  function chooseAmountChargeController($scope) {

    this.activeOption = null
    this.firstSelect = this.activeOption !== null

    this.minimalAmountValidation = (manual) => {
      return  (!angular.isDefined(this.cashAmountModel) || this.cashAmountModel < this.amounts.minimalAmounts.amount / 100) && !angular.element('.option-own-amount').find('input:focus')[0] && this.activeOption === 3
    }

    this.checkType = () => {
      return angular.isDefined(this.cashAmountModel) && this.cashAmountModel.match('/[0-9]{0,}/')
    }

    if (angular.isDefined(this.amountModel.amount) && this.amountModel.amount !== null) {
      this.activeOption = this.amounts.paymentOptions.indexOf(_.find(this.amounts.paymentOptions, {'amount': this.amountModel.amount.amount}))
    } else if (this.amountModel.cashAmount !== null) {
      this.activeOption = 3
      this.cashAmountModel = this.amountModel.cashAmount.amount / 100
    }

    this.selectAmountOption =  (index) => {
      this.activeOption = index
      if (index !== 3) {
        if (!this.firstSelect ) {
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
      scrollHandler: '<',
      amountModel: '=?'
    },
    controller: chooseAmountChargeController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.choose-amount-charge', [])
    .component('chooseAmountCharge', chooseAmountCharge)

}())