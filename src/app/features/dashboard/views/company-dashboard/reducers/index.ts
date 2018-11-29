import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromCompanyProfile from '../company-profile/reducers/company-profile.reducer';
import * as fromRoot from '@platform/reducers';

export interface ICompanyDashboardState {
  companyProfile: fromCompanyProfile.IState;
}

export interface IState extends fromRoot.IState {
  companyDashboard: ICompanyDashboardState;
}
// tslint:disable-next-line:no-any
export const reducers: ActionReducerMap<ICompanyDashboardState, any> = {
  companyProfile: fromCompanyProfile.reducer,
};

export const companyDashboard = createFeatureSelector<IState, ICompanyDashboardState>('companyDashboard');
export const getCompanyProfile = createSelector(
  companyDashboard,
  (state: ICompanyDashboardState) => state.companyProfile,
);

export const getConsultations = createSelector(getCompanyProfile, fromCompanyProfile.getConsultations);
