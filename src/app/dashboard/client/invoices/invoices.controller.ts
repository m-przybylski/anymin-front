import {CompanyInfo} from 'profitelo-api-ng/model/models'

export class DashboardClientInvoicesController {
  public invoiceInfo: CompanyInfo
  public isAnyPaymentMethod = false
  public areInvoices: boolean

  /* @ngInject */
  constructor(getInvoiceData: CompanyInfo) {

    if (getInvoiceData) {
      this.invoiceInfo = getInvoiceData
      this.isAnyPaymentMethod = true
    } else {
      this.isAnyPaymentMethod = false
    }

    this.areInvoices = true
  }
}
