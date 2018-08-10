import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewsService, ExpertProfileView } from '@anymind-ng/api';
import { Observable, from, throwError, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RouterPaths } from '../../../../shared/routes/routes';
import { httpCodes } from '../../../../shared/constants/httpCodes';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';

@Injectable()
export class ExpertDashboardResolverService implements Resolve<IExpertDashboardResolverData> {
  constructor(private views: ViewsService, private router: Router, private userSessionService: UserSessionService) {}

  public resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<IExpertDashboardResolverData> {
    const expertId = route.paramMap.get(RouterPaths.dashboard.expert.params.expertId) as string;
    const session$ = from(this.userSessionService.getSession());
    const expertProfile$ = this.views.getWebExpertProfileRoute(expertId);

    /**
     * Retrive data from both session service
     * and expertProfile endpoint
     * Based on session service system detects if expert
     * and logged user is the same
     */
    return forkJoin(expertProfile$, session$).pipe(
      map(([expertProfile, session]) => ({
        expertProfile,
        isOwnProfile: session.account.id === expertProfile.expertProfile.id,
      })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === httpCodes.notFound) {
          this.router.navigate([RouterPaths.dashboard.notfound.asPath]);
        }

        return throwError(error);
      }),
    );
  }
}

export interface IExpertDashboardResolverData {
  expertProfile: ExpertProfileView;
  isOwnProfile: boolean;
}
