(function() {

  /* @ngInject */
  function controllerFunction() {

    this.activeOption = 0

    return this
  }

  let paymentMethod = {
    templateUrl: 'components/dashboard/charge-account/payment-method/payment-method.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@'
    },
    controller: controllerFunction,
    controllerAs: 'vm'
  }


  angular.module('profitelo.components.dashboard.charge-account.payment-method', [])
    .component('paymentMethod', paymentMethod)

}())
