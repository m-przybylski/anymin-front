(function() {

  /* @ngInject */
  function chooseBankController() {

    this.activeOption = -1
    this.selectBank = (index) => {
      this.activeOption = index
      this.bankModel = this.paymentsLinks[index]
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
