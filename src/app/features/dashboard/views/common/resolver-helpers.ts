import { forkJoin, Observable, throwError, of } from 'rxjs';
import { GetSessionWithAccount } from '@anymind-ng/api';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { httpCodes } from '../../../../shared/constants/httpCodes';
import { Router } from '@angular/router';

/**
 * Function that maps data from backend for resolver
 * Used internaly in:
 * company profile resolver
 * expert profile resolver
 * @param data$ stream of data from backend
 * @param session$ stream of data that keeps user session
 * @param getOwnerId function that extracts id of current user/organization
 * @param router reference for router from DI framework (this.router: Router)
 * @param destinationNotFoundRoute default 'not-found'
 */
export const mapData = <T>(
  data$: Observable<T>,
  session$: Observable<GetSessionWithAccount>,
  getOwnerId: (data: T) => string,
  router: Router,
  destinationNotFoundRoute = 'not-found',
): Observable<IExpertCompanyDashboardResolverData<T>> =>
  forkJoin(
    data$,
    session$.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === httpCodes.unauthorized) {
          return of({
            account: { id: undefined },
            isCompany: false
          });
        }

        return throwError(error);
      }),
    ),
  ).pipe(
    map(([data, session]) => ({
      profile: data,
      isCompany: session.isCompany,
      isOwnProfile: session.account.id === getOwnerId(data),
      isLogged: session.account.id !== undefined,
    })),
    catchError((error: HttpErrorResponse) => {
      if (error.status === httpCodes.notFound) {
        void router.navigate([destinationNotFoundRoute]);
      }

      return throwError(error);
    }),
  );

export interface IExpertCompanyDashboardResolverData<T> {
  profile: T;
  isOwnProfile: boolean;
  isLogged: boolean;
  isCompany: boolean;
}
