// tslint:disable:cyclomatic-complexity
import { DashboardActions } from '@platform/features/dashboard/actions';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';
import { createSelector } from '@ngrx/store';

export interface IState {
  counters: GetImportantActivitiesCounters;
  isPending: boolean;
}

export const initialState: IState = {
  isPending: false,
  counters: {
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
        counters: action.payload,
      };
    }

    case DashboardActions.DashboardActionTypes.IncrementImportantExpertActivitiesCounter: {
      const incrementedCounters = {
        ...state.counters,
        expertProfileActivitiesCount: state.counters.expertProfileActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        counters: incrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.DecrementImportantExpertActivitiesCounter: {
      const decrementedCounters = {
        ...state.counters,
        expertProfileActivitiesCount: state.counters.expertProfileActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        counters: decrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.IncrementImportantClientActivitiesCounter: {
      const incrementedCounters = {
        ...state.counters,
        clientActivitiesCount: state.counters.clientActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        counters: incrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.DecrementImportantClientActivitiesCounter: {
      const decrementedCounters = {
        ...state.counters,
        clientActivitiesCount: state.counters.clientActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        counters: decrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.IncrementImportantOrganizationActivitiesCounter: {
      const incrementedCounters = {
        ...state.counters,
        organizationProfileActivitiesCount: state.counters.organizationProfileActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        counters: incrementedCounters,
      };
    }

    case DashboardActions.DashboardActionTypes.DecrementImportantOrganizationActivitiesCounter: {
      const decrementedCounters = {
        ...state.counters,
        organizationProfileActivitiesCount: state.counters.organizationProfileActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        counters: decrementedCounters,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: IState): boolean => state.isPending;
export const getCounters = (state: IState): GetImportantActivitiesCounters => state.counters;
export const getExpertCounter = (state: IState): number => state.counters.expertProfileActivitiesCount;
export const getClientCounter = (state: IState): number => state.counters.clientActivitiesCount;
export const getCompanyCounter = (state: IState): number => state.counters.organizationProfileActivitiesCount;
export const getCombineCounters = createSelector(
  getExpertCounter,
  getClientCounter,
  (expertCounter, clientCounter) => expertCounter + clientCounter,
);
