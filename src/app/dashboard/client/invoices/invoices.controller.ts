import {GetInvoiceDetails} from 'profitelo-api-ng/model/models'

export class DashboardClientInvoicesController {
  public invoiceInfo: GetInvoiceDetails
  public isAnyPaymentMethod = false
  public areInvoices: boolean

  /* @ngInject */
  constructor(getInvoiceData: void | GetInvoiceDetails) {

    if (getInvoiceData) {
      this.invoiceInfo = getInvoiceData
      this.isAnyPaymentMethod = true
    } else {
      this.isAnyPaymentMethod = false
    }

    this.areInvoices = true
  }
}
