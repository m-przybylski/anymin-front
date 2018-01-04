import {PaymentMethodComponentController} from './payment-method.controller';
import {PaymentSystem} from 'profitelo-api-ng/model/models'

export interface IPaymentMethodComponentBindings {
  title: string
  paymentSystems: PaymentSystem[]
  paymentSystemModel: PaymentSystem
  scrollHandler: (_arg?: number) => void
}

export class PaymentMethodComponent implements ng.IComponentOptions {
  template = require('./payment-method.pug')
  bindings = {
    title: '@',
    paymentSystems: '<',
    paymentSystemModel: '=?',
    scrollHandler: '<',
    lastPayment: '<'
  }
  controller = PaymentMethodComponentController
}
