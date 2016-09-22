(function() {

  /* @ngInject */
  function thankYouPageController($location) {

    this.error = false
    this.price = null

    this.paymentsValues = {
      currency: $location.search().currency || 0,
      amount: $location.search().amount
    }

    console.log(this.paymentsValues.amount)

    if (this.paymentsValues.currency.length === 3 && this.paymentsValues.amount > 0) {
      this.price = this.paymentsValues.amount + ' ' + this.paymentsValues.currency
    } else {
      this.error = !this.error
    }
  }

  let thankYouPage = {
    templateUrl: 'components/dashboard/charge-account/thank-you-page/thank-you-page.tpl.html',
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: thankYouPageController,
    controllerAs: '$ctrl'
  }
  angular.module('profitelo.components.dashboard.charge-account.thank-you-page', [])
    .component('thankYouPage', thankYouPage)

}())
