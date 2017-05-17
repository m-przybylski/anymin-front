import * as angular from 'angular'
import {PaymentSystem, GetLastPayment} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import paypalModule from './paypal/paypal'

interface IPaymentMethodComponentBindings {
  title: string
  paymentSystems: Array<PaymentSystem>
  paymentSystemModel: PaymentSystem
  scrollHandler: (_arg?: number) => void
}

class PaymentMethodComponentController implements IPaymentMethodComponentBindings, ng.IController {
  title: string
  paymentSystems: Array<PaymentSystem>
  paymentSystemModel: PaymentSystem
  scrollHandler: (arg?: number) => void
  activeOption: number | null = null
  firstSelect = false
  lastPayment: GetLastPayment
  /* @ngInject */
  constructor() {
  }

  $onInit = () => {
    if (this.lastPayment && this.paymentSystemModel !== null) {
      this.activeOption = _.findIndex(this.paymentSystems, (paymentSystem) =>
                                        paymentSystem.id === this.lastPayment.paymentSystemId)
      this.paymentSystemModel = this.paymentSystems[this.activeOption]
    }
  }

  public setImage = (slug: string) => {
    const imagePath = '/assets/images/%s-logo.png'
    return imagePath.replace('%s', slug)
  }

  public selectPaymentMethod = (index: number) => {
    this.scrollHandler()
    this.firstSelect = true

    this.activeOption = index
    this.paymentSystemModel = this.paymentSystems[index]
  }
}

class PaymentMethodComponent implements ng.IComponentOptions {
  template = require('./payment-method.pug')()
  bindings = {
    title: '@',
    paymentSystems: '<',
    paymentSystemModel: '=?',
    scrollHandler: '<',
    lastPayment: '<'
  }
  controller = PaymentMethodComponentController
}

angular.module('profitelo.components.dashboard.charge-account.payment-method', [

  paypalModule
])
  .component('paymentMethod', new PaymentMethodComponent())
