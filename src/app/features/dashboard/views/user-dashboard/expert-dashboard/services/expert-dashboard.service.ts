import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  ViewsService,
  ExpertProfileView,
  GetSessionWithAccount,
  ProfileService,
  GetProfileWithDocuments,
} from '@anymind-ng/api';
import { Observable, forkJoin } from 'rxjs';
import { mapData, IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';

@Injectable()
export class ExpertDashboardService {
  constructor(
    private views: ViewsService,
    private router: Router,
    private profileService: ProfileService,
    private store: Store<fromCore.IState>,
  ) {}

  public getExpertProfileData(expertId: string): Observable<IExpertCompanyDashboardResolverData<IExpertProfile>> {
    /** get session to resolve logged user */
    const session$ = this.store.pipe(
      select(fromCore.getSession),
      take(1),
    ) as Observable<GetSessionWithAccount>;
    /** get expert profile from backend */
    const expertProfile$ = forkJoin(
      this.views.getWebExpertProfileRoute(expertId),
      this.profileService.getProfileRoute(expertId),
    ).pipe(
      map(([expertProfileView, getProfileWithDocuments]) => ({
        expertProfileView: {
          ...expertProfileView,
          employments: expertProfileView.employments.filter(
            employment => employment.serviceDetails.deletedAt === undefined,
          ),
        },
        getProfileWithDocuments,
      })),
    );

    return mapData<IExpertProfile>(
      expertProfile$,
      session$,
      data => data.expertProfileView.expertProfile.id,
      this.router,
    );
  }
}

export interface IExpertProfile {
  expertProfileView: ExpertProfileView;
  getProfileWithDocuments: GetProfileWithDocuments;
}
