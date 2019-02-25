import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CompanyProfileService } from '../services/company-profile.service';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { CompanyProfilePageActions, CompanyProfileApiActions } from '../actions';
import { of } from 'rxjs';

@Injectable()
export class CompanyProfileEffects {
  @Effect()
  public loadCompanyProfile$ = this.actions$.pipe(
    ofType<CompanyProfilePageActions.LoadProfileAction | CompanyProfilePageActions.UpdateProfileAction>(
      CompanyProfilePageActions.CompanyProfilePageActionTypes.Load,
      CompanyProfilePageActions.CompanyProfilePageActionTypes.UpdateProfile,
    ),
    map(action => action.payload),
    exhaustMap(profileId =>
      this.companyProfileService.getOrganizationData(profileId).pipe(
        map(data => new CompanyProfileApiActions.LoadProfileActionSuccess(data)),
        catchError(err => of(new CompanyProfileApiActions.LoadProfileActionFailure(err))),
      ),
    ),
  );

  constructor(private actions$: Actions, private companyProfileService: CompanyProfileService) {}
}
