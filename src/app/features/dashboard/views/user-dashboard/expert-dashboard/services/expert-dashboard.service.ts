import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  ViewsService,
  ExpertProfileView,
  GetSessionWithAccount,
  ProfileService,
  GetProfileWithDocuments,
  EmploymentWithService,
} from '@anymind-ng/api';
import { Observable, forkJoin, from, EMPTY } from 'rxjs';
import { mapData, IExpertCompanyDashboardResolverData } from '../../../common/resolver-helpers';
import { map, take, mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { ExpertDashboardActions } from '../actions';
import { ConsultationDetailActions } from '@platform/shared/components/modals/consultation-details/actions';

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
      data => data.expertProfileView.expertProfile.accountId,
      this.router,
    );
  }

  public addConsultation(
    modalResult: Promise<ConsultationDetailActions.ConsultationDetailsActionsUnion | void>,
    getProfileWithDocuments$: Observable<GetProfileWithDocuments>,
  ): void {
    from(modalResult)
      .pipe(
        mergeMap(result => {
          if (result instanceof ConsultationDetailActions.AddConsultationAction) {
            return forkJoin(
              getNotUndefinedSession(this.store).pipe(
                map(session => ({ session, getService: result.payload })),
                take(1),
              ),
              getProfileWithDocuments$.pipe(take(1)),
            );
          }

          return EMPTY;
        }),
        map(([{ session, getService }, getProfileWithDocuments]) => {
          const consultation: EmploymentWithService = {
            commentCounter: 0,
            createdAt: getService.createdAt,
            employeeId: session.account.id,
            id: '', // not needed kind of
            ratingCounter: 0,
            usageCounter: 0,
            /**
             * we do not care about this value at the moment
             * it is possible that vat assigned to account will be undefined
             * need to cast it, so typescript does not complain
             */
            vatRateType: session.account.vatRateType as EmploymentWithService.VatRateTypeEnum,
            serviceDetails: {
              ...getService,
              ownerProfile: getProfileWithDocuments.profile,
              vatRateType: session.account.vatRateType as EmploymentWithService.VatRateTypeEnum,
            },
          };

          return consultation;
        }),
      )
      .subscribe(consultation => {
        this.store.dispatch(new ExpertDashboardActions.AddConsultationAction(consultation));
      });
  }
}

export interface IExpertProfile {
  expertProfileView: ExpertProfileView;
  getProfileWithDocuments: GetProfileWithDocuments;
}
