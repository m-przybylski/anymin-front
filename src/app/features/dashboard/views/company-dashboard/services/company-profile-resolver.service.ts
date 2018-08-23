import { Injectable } from '@angular/core';
import { ViewsService, OrganizationProfileView, GetProfileWithDocuments, ProfileService } from '@anymind-ng/api';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserSessionService } from '../../../../../core/services/user-session/user-session.service';
import { Observable, from, forkJoin } from 'rxjs';
import { mapData, IExpertCompanyDashboardResolverData } from '../../common/resolver-helpers';

@Injectable()
export class CompanyProfileResolverService
  implements Resolve<IExpertCompanyDashboardResolverData<OrganizationProfile>> {
  constructor(
    private views: ViewsService,
    private router: Router,
    private userSessionService: UserSessionService,
    private profileService: ProfileService,
  ) {}
  public resolve(route: ActivatedRouteSnapshot): Observable<IExpertCompanyDashboardResolverData<OrganizationProfile>> {
    /** get profile Id from route */
    const profileId = route.paramMap.get('profileId') as string;
    /** get information who is logged */
    const session$ = from(this.userSessionService.getSession());
    /** get data from backend - organization profile - consultataions */
    const organizationDetails$ = this.views.getWebOrganizationProfileRoute(profileId);
    /** get data from backend - organization details - name, desc, logo, links */
    const profileDetails$ = this.profileService.getProfileRoute(profileId);

    return mapData<OrganizationProfile>(
      forkJoin(organizationDetails$, profileDetails$),
      session$,
      ([_consultations, profileDetails]) => profileDetails.profile.id,
      this.router,
    );
  }
}

export type OrganizationProfile = [OrganizationProfileView, GetProfileWithDocuments];
