import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ViewsService, ExpertProfileView } from '@anymind-ng/api';
import { Observable, from } from 'rxjs';
import { RouterPaths } from '../../../../../shared/routes/routes';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { mapData, IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';

@Injectable()
export class ExpertDashboardResolverService implements Resolve<IExpertCompanyDashboardResolverData<ExpertProfileView>> {
  constructor(private views: ViewsService, private router: Router, private userSessionService: UserSessionService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<IExpertCompanyDashboardResolverData<ExpertProfileView>> {
    /** get expert id from route */
    const expertId = route.paramMap.get(RouterPaths.dashboard.expert.params.expertId) as string;
    /** get session to resolve logged user */
    const session$ = from(this.userSessionService.getSession());
    /** get expert profile from backend */
    const expertProfile$ = this.views.getWebExpertProfileRoute(expertId);

    return mapData<ExpertProfileView>(expertProfile$, session$, data => data.expertProfile.id, this.router);
  }
}
