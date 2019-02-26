import { GetProfileActivity } from '@anymind-ng/api';
import { IActivity } from '@platform/features/dashboard/views/activities/activities.interface';
import { ActivitiesUtilsService } from '@platform/features/dashboard/views/activities/services/activities-utils.service';
import {
  ActivitiesActions,
  ActivitiesApiActions,
  ActivitiesPageActions,
  ActivitiesWsActions,
} from '@platform/features/dashboard/views/activities/actions';

type ActionUnion =
  | ActivitiesActions.ActivitiesActionUnion
  | ActivitiesApiActions.ActivitiesApiActionUnion
  | ActivitiesPageActions.ActivitiesPageActionUnion
  | ActivitiesWsActions.ActivitiesWsActionUnion;

export interface IState {
  importantActivitiesList: ReadonlyArray<IActivity>;
  importantActivitiesCount: number;
  activitiesList: ReadonlyArray<IActivity>;
  activitiesCount: number;
  isLoaded: boolean;
  isListFiltered: boolean;
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
  isListFiltered: false,
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
    case ActivitiesActions.ActivitiesActionTypes.LoadExpertActivitiesWithBalance:
    case ActivitiesActions.ActivitiesActionTypes.LoadCompanyActivitiesWithBalance:
    case ActivitiesActions.ActivitiesActionTypes.LoadClientActivities:
      return {
        ...state,
        isLoaded: false,
        isListFiltered: false,
      };

    case ActivitiesPageActions.ActivitiesPageActionTypes.LoadFilteredCompanyActivities:
      return {
        ...state,
        isLoaded: false,
        isListFiltered: true,
      };

    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadActivitiesWithImportantSuccess:
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

    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadClientActivitiesWithImportantSuccess:
      return {
        ...state,
        importantActivitiesList: ActivitiesUtilsService.mapClientActivities(
          action.payload.importantActivitiesList.activities,
        ),
        importantActivitiesCount: action.payload.importantActivitiesList.count,
        activitiesList: ActivitiesUtilsService.mapClientActivities(action.payload.activitiesList.activities),
        activitiesCount: action.payload.activitiesList.count,
        isLoaded: true,
        currentOffset: action.payload.activitiesList.activities.length,
        displayedImportantActivitiesIds: sliceImportantActivities(
          ActivitiesUtilsService.mapClientActivities(action.payload.importantActivitiesList.activities),
        ),
      };

    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadActivitiesWithImportantFailure:
      return {
        ...initialState,
        isLoaded: true,
      };

    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadActivitiesSuccess:
      return {
        ...state,
        activitiesList: state.activitiesList.concat(action.payload.activities),
        activitiesCount: action.payload.count,
        isLoaded: true,
        currentOffset: state.currentOffset + action.payload.activities.length,
      };

    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadFilteredActivitiesSuccess:
      return {
        ...state,
        activitiesList: action.payload.activities,
        activitiesCount: action.payload.count,
        isLoaded: true,
        currentOffset: action.payload.activities.length,
      };

    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadFilteredActivitiesFailure:
      return {
        ...state,
        isLoaded: true,
      };

    case ActivitiesPageActions.ActivitiesPageActionTypes.ShowImportantActivities:
      return {
        ...state,
        importantActivitiesShow: true,
        displayedImportantActivitiesIds: pluckImportantActivitiesIds(state.importantActivitiesList),
      };
    case ActivitiesPageActions.ActivitiesPageActionTypes.HideImportantActivities:
      return {
        ...state,
        importantActivitiesShow: false,
        displayedImportantActivitiesIds: sliceImportantActivities(state.importantActivitiesList),
      };

    case ActivitiesPageActions.ActivitiesPageActionTypes.ActivityDetailsClosed:
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
    case ActivitiesApiActions.ActivitiesApiActionTypes.LoadActivitySuccess:
      /**
       * I assume that new added activity should be on the first page,
       * so I need to check if activity is on the list
       * Scenarios to cover:
       * 1. loaded page will be refreshed by router when navigated out of call
       * 2. loaded page will not be refreshed, because someone handled conversion
       * in different card/device.
       * Important count must be increased all the time because information source is websocket
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
export const getActivitiesList = (
  state: IState,
): ReadonlyArray<GetProfileActivity> | ReadonlyArray<GetProfileActivity> => state.activitiesList;
export const getActivitiesCount = (state: IState): number => state.activitiesCount;
export const getCurrentOffset = (state: IState): number => state.currentOffset;
export const getOffsetIterator = (state: IState): number => state.offsetIterator;
export const getShowImportantActivities = (state: IState): boolean => state.importantActivitiesShow;
export const getDisplayedImportantActivitiesIds = (state: IState): ReadonlyArray<string> =>
  state.displayedImportantActivitiesIds;
export const getImportantActivitiesOffset = (state: IState): number => state.importantActivitiesOffset;
export const getIsLoaded = (state: IState): boolean => state.isLoaded;
export const getIsListFiltered = (state: IState): boolean => state.isListFiltered;
