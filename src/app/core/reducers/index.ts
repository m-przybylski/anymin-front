import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromLogin from './login.reducer';
import * as fromSession from './session.reducer';
import { SessionActions } from '@platform/core/actions';

export interface ICoreState {
  login: fromLogin.IState;
  session: fromSession.IState;
}

export interface IState extends fromRoot.IState {
  core: ICoreState;
}

export const reducers: ActionReducerMap<ICoreState, SessionActions.FetchActionsUnion> = {
  login: fromLogin.reducer,
  session: fromSession.reducer,
};

export const selectCoreState = createFeatureSelector<IState, ICoreState>('core');

export const selectLogin = createSelector(selectCoreState, (state: ICoreState) => state.login);
export const selectSession = createSelector(selectCoreState, (state: ICoreState) => state.session);

export const getSession = createSelector(selectSession, fromSession.getSession);
export const getLoggedIn = createSelector(selectSession, state => ({
  isLoggedIn: typeof state.session !== 'undefined',
  isFromBackend: state.isFromBackend,
  isPending: state.isPending,
}));
export const getLoginError = createSelector(selectLogin, fromLogin.getError);
export const getLoginPending = createSelector(selectLogin, fromLogin.getIsPending);
