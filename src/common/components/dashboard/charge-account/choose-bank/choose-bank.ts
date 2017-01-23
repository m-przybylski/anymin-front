(function () {

  /* @ngInject */
  function chooseBankController(smoothScrollingService, lodash) {

    this.$onInit = () => {
      if (angular.isDefined(this.bankModel.value)) {
        this.activeOption = this.paymentsLinks.indexOf(lodash.find(this.paymentsLinks, {'value': this.bankModel.value}))
        this.bankModel = this.paymentsLinks[this.activeOption]
        this.firstSelect = true
      }
    }

    this.activeOption = null
    this.firstSelect = this.activeOption === null

    const _scrollAfterChooseBank = (scrollTo) => {
      if (angular.isDefined(scrollTo) && this.firstSelect) {
        smoothScrollingService.scrollTo(scrollTo)
      }
    }

    this.selectBank = (index) => {
      _scrollAfterChooseBank(this.scrollSectionId)
      this.activeOption = index
      this.firstSelect = false
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
      bankModel: '=?',
      scrollSectionId: '<'
    },
    controller: chooseBankController,
    controllerAs: '$ctrl'
  }

  angular.module('profitelo.components.dashboard.charge-account.choose-bank', [
    'ngLodash',
    'profitelo.services.smooth-scrolling'
  ])
  .component('chooseBank', chooseBank)

}())
