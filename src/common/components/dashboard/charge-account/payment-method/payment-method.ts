namespace profitelo.components.dashboard.chargeAccount.paymentMethod {
import LoDashStatic = _.LoDashStatic

  /* @ngInject */
  function paymentMethodController(lodash: LoDashStatic) {

    this.$onInit = () => {
      if (this.paymentSystemModel !== null) {
        this.activeOption = lodash.findIndex(this.paymentSystems, (paymentSystem: any) => {
          return paymentSystem.id = this.paymentSystemModel
        })
        this.paymentSystemModel = this.paymentSystems[this.activeOption]
      }
    }

    this.activeOption = null
    this.firstSelect = this.activeOption !== null

    this.setImage = (slug: string) => {
      const imagePath = '/assets/images/%s-logo.png'
      return imagePath.replace('%s', slug)
    }

    this.selectPaymentMethod = (index: number) => {
      this.scrollHandler()
      this.firstSelect = true

      this.activeOption = index
      this.paymentSystemModel = this.paymentSystems[index]
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

  angular.module('profitelo.components.dashboard.charge-account.payment-method', [
    'ngLodash'
  ])
  .component('paymentMethod', paymentMethod)

}
