import {PaymentSystem, GetLastPayment} from 'profitelo-api-ng/model/models'
import * as _ from 'lodash'
import {IPaymentMethodComponentBindings} from './payment-method.component';

export class PaymentMethodComponentController implements IPaymentMethodComponentBindings, ng.IController {
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
