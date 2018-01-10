import {GetCompanyInvoiceDetails} from 'profitelo-api-ng/model/models'

export class DashboardClientInvoicesController {
  public invoiceInfo: GetCompanyInvoiceDetails
  public isAnyPaymentMethod = false
  public areInvoices: boolean

    constructor(getInvoiceData: void | GetCompanyInvoiceDetails) {

    if (getInvoiceData) {
      this.invoiceInfo = getInvoiceData
      this.isAnyPaymentMethod = true
    } else {
      this.isAnyPaymentMethod = false
    }

    this.areInvoices = true
  }
}
