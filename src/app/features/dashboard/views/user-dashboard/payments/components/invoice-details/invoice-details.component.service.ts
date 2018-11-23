import { Observable } from 'rxjs';
import { AccountService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { ICompanyInvoiceDetails } from './components/company-invoice-details/company-invoice-details.component';
import { map } from 'rxjs/operators';

@Injectable()
export class InvoiceDetailsComponentService {
  constructor(private accountService: AccountService) {}

  public getInvoiceDetails = (): Observable<ICompanyInvoiceDetails> =>
    this.accountService.getCompanyPayoutInvoiceDetailsRoute().pipe(
      map(response => ({
        vatNumber: response.vatNumber,
        companyName: response.companyName,
        address: response.address.address,
        city: response.address.city,
        postalCode: response.address.postalCode,
        email: response.email,
      })),
    );
}
