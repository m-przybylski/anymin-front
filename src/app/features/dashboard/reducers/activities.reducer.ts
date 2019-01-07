// tslint:disable:cyclomatic-complexity
import { DashboardActions } from '@platform/features/dashboard/actions';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';
import { createSelector } from '@ngrx/store';

export interface IState {
  activitiesCounters: GetImportantActivitiesCounters;
  isPending: boolean;
}

export const initialState: IState = {
  isPending: false,
  activitiesCounters: {
    clientActivitiesCount: 0,
    expertProfileActivitiesCount: 0,
    organizationProfileActivitiesCount: 0,
  },
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: DashboardActions.DashboardActionsUnion): IState {
  switch (action.type) {
    case DashboardActions.DashboardActionTypes.FetchImportantActivitiesCounterFromServer: {
      return {
        ...state,
        isPending: true,
      };
    }

    case DashboardActions.DashboardActionTypes.FetchImportantActivitiesCounterFromServerError: {
      return {
        ...state,
        isPending: false,
      };
    }

    case DashboardActions.DashboardActionTypes.FetchImportantActivitiesCounterFromServerSuccess: {
      return {
        ...state,
        isPending: false,
        activitiesCounters: action.payload,
      };
    }

    case DashboardActions.DashboardActionTypes.IncrementImportantExpertActivitiesCounter: {
      const incrementedCounters = {
        ...state.activitiesCounters,
        expertProfileActivitiesCount: state.activitiesCounters.expertProfileActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        activitiesCounters: incrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.DecrementImportantExpertActivitiesCounter: {
      const decrementedCounters = {
        ...state.activitiesCounters,
        expertProfileActivitiesCount: state.activitiesCounters.expertProfileActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        activitiesCounters: decrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.IncrementImportantClientActivitiesCounter: {
      const incrementedCounters = {
        ...state.activitiesCounters,
        clientActivitiesCount: state.activitiesCounters.clientActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        activitiesCounters: incrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.DecrementImportantClientActivitiesCounter: {
      const decrementedCounters = {
        ...state.activitiesCounters,
        clientActivitiesCount: state.activitiesCounters.clientActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        activitiesCounters: decrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.IncrementImportantOrganizationActivitiesCounter: {
      const incrementedCounters = {
        ...state.activitiesCounters,
        organizationProfileActivitiesCount: state.activitiesCounters.organizationProfileActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        activitiesCounters: incrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.DecrementImportantOrganizationActivitiesCounter: {
      const decrementedCounters = {
        ...state.activitiesCounters,
        organizationProfileActivitiesCount: state.activitiesCounters.organizationProfileActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        activitiesCounters: decrementedCounters,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: IState): boolean => state.isPending;
export const getCounters = (state: IState): GetImportantActivitiesCounters => state.activitiesCounters;
export const getExpertActivitiesCounter = (state: IState): number =>
  state.activitiesCounters.expertProfileActivitiesCount;
export const getClientCounter = (state: IState): number => state.activitiesCounters.clientActivitiesCount;
export const getCompanyCounter = (state: IState): number => state.activitiesCounters.organizationProfileActivitiesCount;
export const getCombineCounters = createSelector(
  getExpertActivitiesCounter,
  getClientCounter,
  (expertCounter, clientCounter) => expertCounter + clientCounter,
);
