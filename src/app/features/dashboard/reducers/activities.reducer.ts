// tslint:disable:cyclomatic-complexity
import { ActivitiesActions } from '@platform/features/dashboard/actions';
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
export function reducer(state = initialState, action: ActivitiesActions.ActivitiesActionsUnion): IState {
  switch (action.type) {
    case ActivitiesActions.ActivitiesActionTypes.FetchImportantActivitiesCounterFromServer: {
      return {
        ...state,
        isPending: true,
      };
    }

    case ActivitiesActions.ActivitiesActionTypes.FetchImportantActivitiesCounterFromServerError: {
      return {
        ...state,
        isPending: false,
      };
    }

    case ActivitiesActions.ActivitiesActionTypes.FetchImportantActivitiesCounterFromServerSuccess: {
      return {
        ...state,
        isPending: false,
        counters: action.payload,
      };
    }

    case ActivitiesActions.ActivitiesActionTypes.IncrementImportantExpertActivitiesCounter: {
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

    case ActivitiesActions.ActivitiesActionTypes.DecrementImportantExpertActivitiesCounter: {
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

    case ActivitiesActions.ActivitiesActionTypes.IncrementImportantClientActivitiesCounter: {
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

    case ActivitiesActions.ActivitiesActionTypes.DecrementImportantClientActivitiesCounter: {
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

    default: {
      return state;
    }
  }
}

export const getPending = (state: IState): boolean => state.isPending;
export const getCounters = (state: IState): GetImportantActivitiesCounters => state.counters;
export const getExpertCounter = (state: IState): number => state.counters.expertProfileActivitiesCount;
export const getClientCounter = (state: IState): number => state.counters.clientActivitiesCount;
export const getCombineCounters = createSelector(
  getExpertCounter,
  getClientCounter,
  (expertCounter, clientCounter) => expertCounter + clientCounter,
);
