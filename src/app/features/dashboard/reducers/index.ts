import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromDashboard from './activities.reducer';
import * as fromRoot from '@platform/reducers';
import { ActivitiesActions } from '@platform/features/dashboard/actions/index';

export interface IDashboardState {
  dashboard: fromDashboard.IState;
}

export interface IState extends fromRoot.IState {
  dashboard: IDashboardState;
}

export const reducers: ActionReducerMap<IDashboardState, ActivitiesActions.ActivitiesActionsUnion> = {
  dashboard: fromDashboard.reducer,
};

export const selectActivitiesState = createFeatureSelector<IState, IDashboardState>('dashboard');

export const selectActivities = createSelector(selectActivitiesState, (state: IDashboardState) => state.dashboard);

export const getCounters = createSelector(selectActivities, fromDashboard.getCounters);

export const getCombineCounters = createSelector(selectActivities, fromDashboard.getCombineCounters);
