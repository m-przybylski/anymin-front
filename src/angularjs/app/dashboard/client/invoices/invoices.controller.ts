// tslint:disable:strict-boolean-expressions
import { GetCompanyInvoiceDetails } from 'profitelo-api-ng/model/models';

// tslint:disable:member-ordering
export class DashboardClientInvoicesController {
  public static $inject = ['getInvoiceData'];
  public invoiceInfo: GetCompanyInvoiceDetails;
  public isAnyPaymentMethod = false;
  public areInvoices: boolean;

  constructor(getInvoiceData: void | GetCompanyInvoiceDetails) {

    if (getInvoiceData) {
      this.invoiceInfo = getInvoiceData;
      this.isAnyPaymentMethod = true;
    } else {
      this.isAnyPaymentMethod = false;
    }

    this.areInvoices = true;
  }
}
