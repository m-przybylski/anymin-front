(function() {

  /* @ngInject */
  function controllerFunction() {

    this.activeOption = -1
    console.log(this.paymentsLinks)
    return this
  }

  let chooseBank = {
    templateUrl: 'components/dashboard/charge-account/choose-bank/choose-bank.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@',
      paymentsLinks: '<'
    },
    controller: controllerFunction,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.choose-bank', [])
    .component('chooseBank', chooseBank)

}())
