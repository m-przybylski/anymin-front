import * as fromActivites from './activities.reducer';
import * as fromBalance from './balance.reducer';
import * as fromRoot from '@platform/reducers';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';
import { GetProfileActivity } from '@anymind-ng/api';

export interface IActivitiesState {
  activities: fromActivites.IState;
  balance: fromBalance.IState;
}

export interface IState extends fromRoot.IState {
  activities: IActivitiesState;
}

// tslint:disable-next-line:no-any
export const reducers: ActionReducerMap<IActivitiesState, any> = {
  activities: fromActivites.reducer,
  balance: fromBalance.reducer,
};

/**
 * selector for activities part of the store
 * from lazdy loaded module
 */
export const getActivitiesState = createFeatureSelector<IState, IActivitiesState>('activities');

/**
 * selectors for activieties
 */
const getActivities = createSelector(
  getActivitiesState,
  state => state.activities,
);

export const getActivitiesList = createSelector(
  getActivities,
  fromActivites.getActivitiesList,
);
export const getActivitiesCount = createSelector(
  getActivities,
  fromActivites.getActivitiesCount,
);
export const getImportantActivitiesList = createSelector(
  getActivities,
  fromActivites.getImportantActivitiesList,
);
export const getImportantActivitiesCount = createSelector(
  getActivities,
  fromActivites.getImportantActivitiesCount,
);
export const getActivitiesIsLoaded = createSelector(
  getActivities,
  fromActivites.getIsLoaded,
);
export const getIsListFiltered = createSelector(
  getActivities,
  fromActivites.getIsListFiltered,
);
export const getCurrentOffset = createSelector(
  getActivities,
  fromActivites.getCurrentOffset,
);
export const getOffsetIterator = createSelector(
  getActivities,
  fromActivites.getOffsetIterator,
);
export const getShowImportantActivities = createSelector(
  getActivities,
  fromActivites.getShowImportantActivities,
);
export const getDisplayedImportantActivitiesIds = createSelector(
  getActivities,
  fromActivites.getDisplayedImportantActivitiesIds,
);
export const getImportantActivitiesOffset = createSelector(
  getActivities,
  fromActivites.getImportantActivitiesOffset,
);
/**
 * selectors for activieties with logic
 * combine selectors for activites and important activites
 */
export const getAllActivitiesList = createSelector(
  getActivitiesList,
  getImportantActivitiesList,
  (activitiesList, importantActivitiesList) => ({ activitiesList, importantActivitiesList }),
);
/**
 * if offset is equal to activitiesCount it means no more items to load
 */
export const isMoreActivity = createSelector(
  getCurrentOffset,
  getActivitiesCount,
  (currentOffset, activitiesCount) => currentOffset < activitiesCount,
);
/**
 * find activities in the list based on ids
 */
export const getDisplayedImportantActivities = createSelector(
  getDisplayedImportantActivitiesIds,
  getImportantActivitiesList,
  (ids, activityList) =>
    ids
      .map(id => activityList.find(activity => activity.id === id))
      .filter(activity => activity !== undefined) as ReadonlyArray<GetProfileActivity>,
);
/**
 * select both offsets in one hit
 */
export const getCurrentOffsets = createSelector(
  getCurrentOffset,
  getOffsetIterator,
  (current, iterator) => ({
    current,
    iterator,
  }),
);
/**
 * selectors for balance
 */
const getBalance = createSelector(
  getActivitiesState,
  state => state.balance,
);
export const getBalanceAmount = createSelector(
  getBalance,
  fromBalance.getBalance,
);
export const getCombinedBalance = createSelector(
  getBalance,
  fromBalance.getCombinedBalance,
);
export const getCombinedBlockedBalance = createSelector(
  getBalance,
  fromBalance.getCombinedBlockedBalance,
);
export const getBalanceIsLoaded = createSelector(
  getBalance,
  fromBalance.getIsLoaded,
);

export const getIsLoaded = createSelector(
  getBalanceIsLoaded,
  getActivitiesIsLoaded,
  (balanceIsLoaded, activitiesIsLoaded) => balanceIsLoaded && activitiesIsLoaded,
);
