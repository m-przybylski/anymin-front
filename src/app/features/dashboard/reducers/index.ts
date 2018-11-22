import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromDashboard from './activities.reducer';
import * as fromRoot from '@platform/reducers';
import * as fromVisiblity from './visibility.reducer';

export interface IDashboardState {
  dashboard: fromDashboard.IState;
  visibility: fromVisiblity.IState;
}

export interface IState extends fromRoot.IState {
  dashboard: IDashboardState;
}

export const reducers: ActionReducerMap<IDashboardState> = {
  dashboard: fromDashboard.reducer,
  visibility: fromVisiblity.reducer,
};

export const selectDashboardState = createFeatureSelector<IState, IDashboardState>('dashboard');

export const selectActivities = createSelector(selectDashboardState, (state: IDashboardState) => state.dashboard);

export const getCounters = createSelector(selectActivities, fromDashboard.getCounters);

export const getCompanyCounters = createSelector(selectActivities, fromDashboard.getCompanyCounter);

export const getCombineCounters = createSelector(selectActivities, fromDashboard.getCombineCounters);

export const selectVisiblity = createSelector(selectDashboardState, (state: IDashboardState) => state.visibility);

export const getVisibilityStatus = createSelector(selectVisiblity, fromVisiblity.getVisibility);
