(function() {

  /* @ngInject */
  function paymentMethodController() {

    this.activeOption = 0
    // zmockowane obrazki:
    this.paymentSystems[0].imgSrc = '/assets/images/payU-logo.png'
    this.paymentSystems[1].imgSrc = '/assets/images/paypal-logo.png'
    return this
  }

  let paymentMethod = {
    templateUrl: 'components/dashboard/charge-account/payment-method/payment-method.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@',
      paymentSystems: '<'
    },
    controller: paymentMethodController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.payment-method', [])
    .component('paymentMethod', paymentMethod)

}())
