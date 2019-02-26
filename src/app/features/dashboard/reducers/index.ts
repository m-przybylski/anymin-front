// import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
// import * as fromDashboard from '../../../core/reducers/activities-counter/activities.reducer';
// import * as fromRoot from '@platform/reducers';
// // import * as fromVisiblity from '../../../core/reducers/visibility.reducer';
// // import * as fromInvitations from '../../../core/reducers/invitations/invitations.reducer';
//
// export interface IDashboardState {
//   dashboard: fromDashboard.IState;
//   // visibility: fromVisiblity.IState;
//   // invitations: fromInvitations.IState;
// }
//
// export interface IState extends fromRoot.IState {
//   dashboard: IDashboardState;
// }
//
// export const reducers: ActionReducerMap<IDashboardState> = {
//   dashboard: fromDashboard.reducer,
//   // visibility: fromVisiblity.reducer,
//   // invitations: fromInvitations.reducer,
// };
//
// // export const selectDashboardState = createFeatureSelector<IState, IDashboardState>('dashboard');
//
// // export const selectActivities = createSelector(
// //   selectDashboardState,
// //   (state: IDashboardState) => state.dashboard,
// // );
// //
// // export const getCounters = createSelector(
// //   selectActivities,
// //   fromDashboard.getCounters,
// // );
// //
// // export const getCompanyCounters = createSelector(
// //   selectActivities,
// //   fromDashboard.getCompanyCounter,
// // );
// //
// // export const getExpertActivitiesCounter = createSelector(
// //   selectActivities,
// //   fromDashboard.getExpertActivitiesCounter,
// // );
// //
//
// // export const getCombineCounters = createSelector(
// //   selectActivities,
// //   fromDashboard.getCombineCounters,
// // );
//
//
// // export const selectVisiblity = createSelector(
// //   selectDashboardState,
// //   (state: IDashboardState) => state.visibility,
// // );
//
// // export const getVisibilityStatus = createSelector(
// //   selectVisiblity,
// //   fromVisiblity.getVisibility,
// // );
// //
// // export const selectInvitations = createSelector(
// //   selectDashboardState,
// //   (state: IDashboardState) => state.invitations,
// // );
// //
// // export const getInvitationsCounter = createSelector(
// //   selectInvitations,
// //   fromInvitations.getInvitationCounter,
// // );
