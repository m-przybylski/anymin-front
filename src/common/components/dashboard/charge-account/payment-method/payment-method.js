(function() {

  /* @ngInject */
  function paymentMethodController() {

    this.activeOption = null
    this.firstSelect = this.activeOption !== null

    // zmockowane obrazki:
    this.paymentSystems[0].imgSrc = '/assets/images/payU-logo.png'
    this.paymentSystems[1].imgSrc = '/assets/images/paypal-logo.png'
    this.paymentSystems[2].imgSrc1= "/assets/images/maestro-logo.png"
    this.paymentSystems[2].imgSrc2 = "/assets/images/mastercard-logo.png"
    this.paymentSystems[2].imgSrc3 = "/assets/images/visa-logo.png"
    
    this.selectPaymentMethod =  (index) => {
      if (index === 0) {
        if (!this.firstSelect ) {
          this.scrollHandler()
          this.firstSelect = true
        }

        this.activeOption = index
        this.paymentSystemModel = this.paymentSystems[index]
      }
    }
    
    return this
    
  }

  let paymentMethod = {
    templateUrl: 'components/dashboard/charge-account/payment-method/payment-method.tpl.html',
    restrict: 'E',
    replace: true,
    bindings: {
      title: '@',
      paymentSystems: '<',
      paymentSystemModel: '=?',
      scrollHandler: '<'
    },
    controller: paymentMethodController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.payment-method', [])
    .component('paymentMethod', paymentMethod)

}())
