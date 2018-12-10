import { AccountService, GetInvoiceDetails, PostCompanyDetails } from '@anymind-ng/api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyInvoiceDetailsComponentService {
  constructor(private accountService: AccountService) {}

  public updateInvoiceDetails = (invoiceDetails: PostCompanyDetails): Observable<GetInvoiceDetails> =>
    this.accountService.postCompanyDetailsRoute(invoiceDetails);
}
