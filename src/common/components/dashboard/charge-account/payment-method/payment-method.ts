import * as angular from "angular"
import {PaymentSystem} from "../../../../api/model/PaymentSystem"
import LoDashStatic = _.LoDashStatic
import paypalModule from "./paypal/paypal"

interface PaymentMethodComponentBindings {
  title: string
  paymentSystems: Array<PaymentSystem>
  paymentSystemModel: PaymentSystem | null
  scrollHandler: (_arg?: number) => void
}

class PaymentMethodComponentController implements PaymentMethodComponentBindings, ng.IController {
  title: string
  paymentSystems: Array<PaymentSystem>
  paymentSystemModel: PaymentSystem | null
  scrollHandler: (arg?: number) => void
  activeOption: number | null = null
  firstSelect = false

  /* @ngInject */
  constructor(private lodash: LoDashStatic) {
  }

  $onInit = () => {
    if (this.paymentSystemModel !== null) {
      this.activeOption = this.lodash.findIndex(this.paymentSystems, (paymentSystem) => paymentSystem.id == this.paymentSystemModel)
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
  template = require('./payment-method.jade')()
  bindings = {
    title: '@',
    paymentSystems: '<',
    paymentSystemModel: '=?',
    scrollHandler: '<'
  }
  controller = PaymentMethodComponentController
}

angular.module('profitelo.components.dashboard.charge-account.payment-method', [
  'ngLodash',
  paypalModule
])
  .component('paymentMethod', new PaymentMethodComponent())
