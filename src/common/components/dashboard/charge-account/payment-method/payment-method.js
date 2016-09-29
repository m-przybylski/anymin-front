(function() {

  /* @ngInject */
  function paymentMethodController() {

    this.activeOption = null
    this.firstSelect = this.activeOption !== null
    
    this.setImage = (slug) => {
      const imagePath = '/assets/images/%s-logo.png'
      return imagePath.replace('%s', slug)
    }
    
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

    if (this.paymentSystemModel !== null) {
      this.activeOption = this.paymentSystemModel - 1
      this.paymentSystemModel = this.paymentSystems[this.activeOption]
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
