import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountService, PostCompanyDetails, GetInvoiceDetails, PostNaturalPersonDetails } from '@anymind-ng/api';
import { map, switchMap, take } from 'rxjs/operators';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { IInvoiceDetails } from './invoice-details.component';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

export type PostInvoiceDetails = PostNaturalPersonDetails | PostCompanyDetails;
@Injectable()
export class InvoiceDetailsComponentService {
  constructor(private store: Store<fromCore.IState>, private accountService: AccountService) {}

  public getInvoiceDetails(): Observable<IInvoiceDetails> {
    return getNotUndefinedSession(this.store).pipe(
      map(session => session.isCompany),
      switchMap(isCompanyProfile =>
        this.accountService.getInvoiceDetailsRoute().pipe(
          map(invoiceDetails => ({
            invoiceDetails,
            isCompanyProfile,
          })),
        ),
      ),
      map(invoiceDetails => invoiceDetails),
      take(1),
    );
  }

  public updateCompanyInvoiceDetails(invoiceDetails: PostCompanyDetails): Observable<GetInvoiceDetails> {
    return this.accountService.postCompanyDetailsRoute(invoiceDetails);
  }

  public updateNaturalPersonInvoiceDetails(invoiceDetails: PostNaturalPersonDetails): Observable<GetInvoiceDetails> {
    return this.accountService.postNaturalPersonDetailsRoute(invoiceDetails);
  }
}
