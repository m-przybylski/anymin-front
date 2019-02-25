import { Injectable } from '@angular/core';
import {
  ViewsService,
  OrganizationProfileView,
  GetProfileWithDocuments,
  ProfileService,
  GetSessionWithAccount,
} from '@anymind-ng/api';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { mapData, IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

@Injectable()
export class CompanyProfileService {
  constructor(
    private views: ViewsService,
    private router: Router,
    private profileService: ProfileService,
    private store: Store<fromCore.IState>,
  ) {}

  public getOrganizationData(profileId: string): Observable<IExpertCompanyDashboardResolverData<IOrganizationProfile>> {
    /** get information who is logged */
    const session$ = this.store.pipe(
      select(fromCore.getSession),
      take(1),
    ) as Observable<GetSessionWithAccount>;
    /** get data from backend - organization profile - consultations */
    const organizationDetails$ = this.views
      .getWebOrganizationProfileRoute(profileId)
      .pipe(
        map(data => ({ ...data, services: data.services.filter(service => service.service.deletedAt === undefined) })),
      );
    /** get data from backend - organization details - name, desc, logo, links */
    const profileDetails$ = this.profileService.getProfileRoute(profileId);

    return mapData<IOrganizationProfile>(
      forkJoin(organizationDetails$, profileDetails$).pipe(
        map(([organization, profile]) => ({ organization, profile })),
      ),
      session$,
      ({ profile }) => profile.profile.id,
      this.router,
    );
  }
}

export interface IOrganizationProfile {
  organization: OrganizationProfileView;
  profile: GetProfileWithDocuments;
}
