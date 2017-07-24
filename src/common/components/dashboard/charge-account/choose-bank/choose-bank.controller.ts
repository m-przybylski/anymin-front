import * as _ from 'lodash'
import {PaymentLink} from 'profitelo-api-ng/model/models'
export class ChooseBankComponentController implements ng.IController {

  public activeOptionIndex: number
  public bankModel: string
  public paymentsLinks: PaymentLink[]
  public onBankSelect: () => void

  /* @ngInject */
  constructor() {
  }

  $onInit = () => {
    if (!!this.bankModel && this.bankModel.length > 0) {
      this.activeOptionIndex = _.findIndex(this.paymentsLinks, (link) => {
        return link.value === this.bankModel
      })
    }
  }

  public selectBank = (index: number): void => {
    this.activeOptionIndex = index
    this.bankModel = this.paymentsLinks[index].value
    this.onBankSelect()
  }
}
