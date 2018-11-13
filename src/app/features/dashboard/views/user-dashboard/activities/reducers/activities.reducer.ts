import { GetProfileActivity } from '@anymind-ng/api';
import {
  ExpertActivitiesActions,
  ExpertActivitiesApiActions,
  ExpertActivitiesPageActions,
  ExpertActivitiesWsActions,
} from '../actions';

type ActionUnion =
  | ExpertActivitiesActions.ExpertActivitiesActionUnion
  | ExpertActivitiesApiActions.ExpertActivitiesApiActionUnion
  | ExpertActivitiesPageActions.ExpertActivitiesPageActionUnion
  | ExpertActivitiesWsActions.ExpertActivitiesWsActionUnion;

export interface IState {
  importantActivitiesList: ReadonlyArray<GetProfileActivity>;
  importantActivitiesCount: number;
  activitiesList: ReadonlyArray<GetProfileActivity>;
  activitiesCount: number;
  isLoaded: boolean;
  currentOffset: number;
  importantActivitiesShow: boolean;
  displayedImportantActivitiesIds: ReadonlyArray<string>;
  readonly offsetIterator: number;
  readonly importantActivitiesOffset: number;
}

const initialState: IState = {
  importantActivitiesList: [],
  importantActivitiesCount: 0,
  activitiesList: [],
  activitiesCount: 0,
  isLoaded: false,
  currentOffset: 0,
  importantActivitiesShow: false,
  displayedImportantActivitiesIds: [],
  offsetIterator: 10,
  importantActivitiesOffset: 3,
};

const pluckImportantActivitiesIds = (
  importantActivitiesList: ReadonlyArray<GetProfileActivity>,
): ReadonlyArray<string> => importantActivitiesList.map(activity => activity.id);

const sliceImportantActivities = ((
  state: IState,
): ((importantActivitiesList: ReadonlyArray<GetProfileActivity>) => ReadonlyArray<string>) => (
  importantActivitiesList: ReadonlyArray<GetProfileActivity>,
): ReadonlyArray<string> =>
  pluckImportantActivitiesIds(importantActivitiesList).slice(0, state.importantActivitiesOffset))(initialState);

// tslint:disable-next-line:only-arrow-functions cyclomatic-complexity
export function reducer(state = initialState, action: ActionUnion): IState {
  switch (action.type) {
    case ExpertActivitiesApiActions.ExpertActivitiesApiActionTypes.LoadExpertActivitiesWithImportantSuccess:
      return {
        ...state,
        importantActivitiesList: action.payload.importantActivitiesList.activities,
        importantActivitiesCount: action.payload.importantActivitiesList.count,
        activitiesList: action.payload.activitiesList.activities,
        activitiesCount: action.payload.activitiesList.count,
        isLoaded: true,
        currentOffset: action.payload.activitiesList.activities.length,
        displayedImportantActivitiesIds: sliceImportantActivities(action.payload.importantActivitiesList.activities),
      };

    case ExpertActivitiesApiActions.ExpertActivitiesApiActionTypes.LoadExpertActivitiesSuccess:
      return {
        ...state,
        activitiesList: state.activitiesList.concat(action.payload.activities),
        activitiesCount: action.payload.count,
        isLoaded: true,
        currentOffset: state.currentOffset + action.payload.activities.length,
      };

    case ExpertActivitiesPageActions.ExpertActivitiesPageActionTypes.ShowImportantActivities:
      return {
        ...state,
        importantActivitiesShow: true,
        displayedImportantActivitiesIds: pluckImportantActivitiesIds(state.importantActivitiesList),
      };
    case ExpertActivitiesPageActions.ExpertActivitiesPageActionTypes.HideImportantActivities:
      return {
        ...state,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: sliceImportantActivities(state.importantActivitiesList),
      };

    case ExpertActivitiesPageActions.ExpertActivitiesPageActionTypes.ActivityDetailsClosed:
      const filteredImportantActivitiesList = state.importantActivitiesList.filter(
        importantActivity => importantActivity.id !== action.payload.id,
      );

      return {
        ...state,
        importantActivitiesCount: state.importantActivitiesCount - 1,
        importantActivitiesList: filteredImportantActivitiesList,
        displayedImportantActivitiesIds: state.importantActivitiesShow
          ? pluckImportantActivitiesIds(filteredImportantActivitiesList)
          : sliceImportantActivities(filteredImportantActivitiesList),
      };
    case ExpertActivitiesApiActions.ExpertActivitiesApiActionTypes.LoadExpertActivitySuccess:
      /**
       * I assume that new added activity should be on the first page,
       * so I need to check if activity is on the list
       * Scenarios to cover:
       * 1. loaded page will be refreshed by router when navigated out of call
       * 2. loaded page will not be refreshed, because someone handled conversion
       * in different card/device.
       * Importat count must be increased all the time because information source is websocket
       */
      const activityExists = state.activitiesList.some(activity => activity.id === action.payload.id);

      return {
        ...state,
        importantActivitiesCount: state.importantActivitiesCount + 1,
        importantActivitiesList: [action.payload, ...state.importantActivitiesList],
        activitiesList: activityExists ? state.activitiesList : [action.payload, ...state.activitiesList],
        currentOffset: activityExists ? state.currentOffset : state.currentOffset + 1,
        displayedImportantActivitiesIds: sliceImportantActivities([action.payload, ...state.importantActivitiesList]),
      };
    default:
      return state;
  }
}

/**
 * selectors for activity store
 */
export const getImportantActivitiesList = (state: IState): ReadonlyArray<GetProfileActivity> =>
  state.importantActivitiesList;
export const getImportantActivitiesCount = (state: IState): number => state.importantActivitiesCount;
export const getActivitiesList = (state: IState): ReadonlyArray<GetProfileActivity> => state.activitiesList;
export const getActivitiesCount = (state: IState): number => state.activitiesCount;
export const getCurrentOffset = (state: IState): number => state.currentOffset;
export const getOffsetIterator = (state: IState): number => state.offsetIterator;
export const getShowImportantActivities = (state: IState): boolean => state.importantActivitiesShow;
export const getDisplayedImportantActivitiesIds = (state: IState): ReadonlyArray<string> =>
  state.displayedImportantActivitiesIds;
export const getImportantActivitiesOffset = (state: IState): number => state.importantActivitiesOffset;
export const getIsLoaded = (state: IState): boolean => state.isLoaded;
