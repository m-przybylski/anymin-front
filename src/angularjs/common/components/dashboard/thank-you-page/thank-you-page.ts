(function (): void {

  /* @ngInject */
  function thankYouPageController($location: ng.ILocationService): void {

    const validCurrencyLength: number = 3
    this.showRecharge = false
    this.price = null

    this.paymentsValues = {
      currency: $location.search().currency || 0,
      amount: parseInt($location.search().amount, 0)
    }

    if (this.paymentsValues.currency.length === validCurrencyLength && this.paymentsValues.amount > 0) {
      this.price = String(this.paymentsValues.amount) + ' ' + String(this.paymentsValues.currency)
      this.showRecharge = true
    }

  }

  const thankYouPage = {
    template: require('./thank-you-page.html'),
    transclude: true,
    controller: thankYouPageController,
    controllerAs: '$ctrl'
  }
  angular.module('profitelo.components.dashboard.thank-you-page', [])
  .component('thankYouPage', thankYouPage)

}())
