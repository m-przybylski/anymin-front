(function() {

  /* @ngInject */
  function chooseBankController() {

    this.activeOption = -1
    this.selectBank = (index) => {
      this.activeOption = index
      this.bankModel = this.paymentsLinks[index]
    }

    if(angular.isDefined(this.bankModel.value)) {
      this.activeOption = this.paymentsLinks.indexOf(_.find(this.paymentsLinks, { 'value': this.bankModel.value}))
      this.bankModel = this.paymentsLinks[this.activeOption]
    }

    return this
  }

  let chooseBank = {
    templateUrl: 'components/dashboard/charge-account/choose-bank/choose-bank.tpl.html',
    restrict: 'E',
    replace: true,
    transclude: true,
    bindings: {
      title: '@',
      paymentsLinks: '<',
      bankModel: '=?'
    },
    controller: chooseBankController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.choose-bank', [])
    .component('chooseBank', chooseBank)

}())
