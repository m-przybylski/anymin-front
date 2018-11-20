import { AccountService, GetCompanyInvoiceDetails, PostCompanyInvoiceDetails } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyInvoiceDetailsComponentService {
  constructor(private accountService: AccountService) {}

  public updateInvoiceDetails = (invoiceDetails: PostCompanyInvoiceDetails): Observable<GetCompanyInvoiceDetails> =>
    this.accountService.postCompanyPayoutInvoiceDetailsRoute(invoiceDetails);
}
