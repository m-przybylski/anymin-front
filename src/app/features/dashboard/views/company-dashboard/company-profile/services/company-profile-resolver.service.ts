import { Injectable } from '@angular/core';
import {
  ViewsService,
  OrganizationProfileView,
  GetProfileWithDocuments,
  ProfileService,
  GetSessionWithAccount,
} from '@anymind-ng/api';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { mapData, IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { map, filter, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

@Injectable()
export class CompanyProfileResolverService
  implements Resolve<IExpertCompanyDashboardResolverData<OrganizationProfile>> {
  constructor(
    private views: ViewsService,
    private router: Router,
    private profileService: ProfileService,
    private store: Store<fromCore.IState>,
  ) {}
  public resolve(route: ActivatedRouteSnapshot): Observable<IExpertCompanyDashboardResolverData<OrganizationProfile>> {
    /** get profile Id from route */
    const profileId = route.paramMap.get('profileId') as string;
    /** get information who is logged */
    const session$ = this.store.pipe(
      select(fromCore.getSession),
      filter(session => session !== undefined),
      take(1),
    ) as Observable<GetSessionWithAccount>;
    /** get data from backend - organization profile - consultataions */
    const organizationDetails$ = this.views
      .getWebOrganizationProfileRoute(profileId)
      .pipe(
        map(data => ({ ...data, services: data.services.filter(service => service.service.deletedAt === undefined) })),
      );
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
