import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountService, PostCompanyDetails, GetInvoiceDetails, PostNaturalPersonDetails } from '@anymind-ng/api';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { IInvoiceDetails } from './invoice-details.component';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { httpCodes } from '@platform/shared/constants/httpCodes';

export type PostInvoiceDetails = PostNaturalPersonDetails | PostCompanyDetails;

@Injectable()
export class InvoiceDetailsComponentService {
  constructor(private store: Store<fromCore.IState>, private accountService: AccountService) {}

  public getInitialData(): Observable<IInvoiceDetails> {
    return getNotUndefinedSession(this.store).pipe(
      map(session => ({
        isCompanyProfile: session.isCompany,
        countryIsoCode: session.account.language.toUpperCase(),
      })),
      switchMap(sessionData =>
        this.accountService.getInvoiceDetailsRoute().pipe(
          catchError(err => {
            if (err.status === httpCodes.notFound) {
              return of(undefined);
            }

            return throwError(err);
          }),
          map(invoiceDetails => ({
            invoiceDetails,
            ...sessionData,
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
