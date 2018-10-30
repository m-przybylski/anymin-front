// tslint:disable:cyclomatic-complexity
import { ActivitiesActionTypes } from '@platform/features/dashboard/actions/activities.actions';
import { ActivitiesActions } from '@platform/features/dashboard/actions/index';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';

export interface IState {
  counters: GetImportantActivitiesCounters;
  isPending: boolean;
}

export const initialState: IState = {
  isPending: false,
  counters: {
    clientActivitiesCount: 0,
    profileActivitiesCount: 0,
  },
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: ActivitiesActions.ActivitiesActionsUnion): IState {
  switch (action.type) {
    case ActivitiesActionTypes.FetchImportantActivitiesCounterFromServer: {
      return {
        ...state,
        isPending: true,
      };
    }

    case ActivitiesActionTypes.FetchImportantActivitiesCounterFromServerError: {
      return {
        ...state,
        isPending: false,
      };
    }

    case ActivitiesActionTypes.FetchImportantActivitiesCounterFromServerSuccess: {
      return {
        ...state,
        isPending: false,
        counters: action.payload,
      };
    }

    case ActivitiesActionTypes.IncrementImportantProfileActivitiesCounter: {
      const incrementedCounters = {
        clientActivitiesCount: state.counters.clientActivitiesCount,
        profileActivitiesCount: state.counters.profileActivitiesCount + 1,
      };

      return {
        ...state,
        isPending: false,
        counters: incrementedCounters,
      };
    }

    case ActivitiesActionTypes.DecrementImportantProfileActivitiesCounter: {
      const decrementedCounters = {
        clientActivitiesCount: state.counters.clientActivitiesCount,
        profileActivitiesCount: state.counters.profileActivitiesCount - 1,
      };

      return {
        ...state,
        isPending: false,
        counters: decrementedCounters,
      };
    }

    case ActivitiesActionTypes.IncrementImportantClientActivitiesCounter: {
      const incrementedCounters = {
        clientActivitiesCount: state.counters.clientActivitiesCount + 1,
        profileActivitiesCount: state.counters.profileActivitiesCount,
      };

      return {
        ...state,
        isPending: false,
        counters: incrementedCounters,
      };
    }

    case ActivitiesActionTypes.DecrementImportantClientActivitiesCounter: {
      const decrementedCounters = {
        clientActivitiesCount: state.counters.clientActivitiesCount - 1,
        profileActivitiesCount: state.counters.profileActivitiesCount,
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
export const getProfileCounter = (state: IState): number => state.counters.profileActivitiesCount;
export const getClientCounter = (state: IState): number => state.counters.clientActivitiesCount;
export const getCombineCounters = (state: IState): number =>
  state.counters.clientActivitiesCount + state.counters.profileActivitiesCount;
