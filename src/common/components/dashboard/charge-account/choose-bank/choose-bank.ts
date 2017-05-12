import * as angular from 'angular'
import * as _ from 'lodash'
import {SmoothScrollingService} from '../../../../services/smooth-scrolling/smooth-scrolling.service'

/* @ngInject */
function chooseBankController(smoothScrollingService: SmoothScrollingService, ) {

  this.$onInit = () => {
    if (angular.isDefined(this.bankModel.value)) {
      this.activeOption = this.paymentsLinks.indexOf(_.find(this.paymentsLinks, {'value': this.bankModel.value}))
      this.bankModel = this.paymentsLinks[this.activeOption]
      this.firstSelect = true
    }
  }

  this.activeOption = null
  this.firstSelect = this.activeOption === null

  const _scrollAfterChooseBank = (scrollTo: string) => {
    if (angular.isDefined(scrollTo) && this.firstSelect) {
      smoothScrollingService.scrollTo(scrollTo)
    }
  }

  this.selectBank = (index: number) => {
    _scrollAfterChooseBank(this.scrollSectionId)
    this.activeOption = index
    this.firstSelect = false
    this.bankModel = this.paymentsLinks[index]
  }

  return this
}

const chooseBank = {
  template: require('./choose-bank.pug')(),
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

  'profitelo.services.smooth-scrolling'
])
  .component('chooseBank', chooseBank)
