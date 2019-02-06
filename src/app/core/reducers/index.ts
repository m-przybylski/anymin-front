import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '@platform/reducers';
import * as fromLogin from './login.reducer';
import * as fromSession from './session.reducer';
import * as fromNavbar from './navbar.reducer';
import * as fromForgotPassword from './forgot-password.reducer';

export interface ICoreState {
  login: fromLogin.IState;
  session: fromSession.IState;
  userType: fromNavbar.IState;
  forgotPassword: fromForgotPassword.IState;
}

export interface IState extends fromRoot.IState {
  core: ICoreState;
}

// tslint:disable-next-line:no-any
export const reducers: ActionReducerMap<ICoreState, any> = {
  login: fromLogin.reducer,
  session: fromSession.reducer,
  userType: fromNavbar.reducer,
  forgotPassword: fromForgotPassword.reducer,
};

export const selectCoreState = createFeatureSelector<IState, ICoreState>('core');

export const selectLogin = createSelector(
  selectCoreState,
  (state: ICoreState) => state.login,
);
export const selectSession = createSelector(
  selectCoreState,
  (state: ICoreState) => state.session,
);
export const selectUserType = createSelector(
  selectCoreState,
  (state: ICoreState) => state.userType,
);
export const selectForgotPassword = createSelector(
  selectCoreState,
  (state: ICoreState) => state.forgotPassword,
);

export const getSession = createSelector(
  selectSession,
  fromSession.getSession,
);
export const getLoggedIn = createSelector(
  selectSession,
  state => ({
    isLoggedIn: typeof state.session !== 'undefined',
    isFromBackend: state.isFromBackend,
    isPending: state.isPending,
    session: state.session,
  }),
);
export const getSessionPending = createSelector(
  selectSession,
  fromSession.getPending,
);

export const getFirstLogin = createSelector(
  selectSession,
  fromSession.isFirstLogin,
);
export const getSessionError = createSelector(
  selectSession,
  fromSession.getError,
);
export const getLoginError = createSelector(
  selectLogin,
  fromLogin.getError,
);
export const getLoginPending = createSelector(
  selectLogin,
  fromLogin.getIsPending,
);
export const getUserType = createSelector(
  selectUserType,
  fromNavbar.getUserType,
);
export const getSessionAndUserType = createSelector(
  getSession,
  getUserType,
  (session, userType) => ({
    getSession: session,
    getUserType: userType,
  }),
);
export const getIsNavbarUserMenuVisible = createSelector(
  selectUserType,
  fromNavbar.getIsNavbarUserMenuVisible,
);
export const getIsNavbarHelpMenuVisible = createSelector(
  selectUserType,
  fromNavbar.getIsNavbarHelpMenuVisible,
);
export const getForgotPasswordMsisdnToken = createSelector(
  selectForgotPassword,
  fromForgotPassword.getMsisdnToken,
);
