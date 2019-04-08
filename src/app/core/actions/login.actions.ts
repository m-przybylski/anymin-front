import { Action } from '@ngrx/store';
import { LoginCredentials, GetSessionWithAccount } from '@anymind-ng/api';

export enum AuthActionTypes {
  Login = '[auth] Login',
  LoginFromModal = '[auth] Login from modal',
  LoginFromModalSuccess = '[auth] Login from modal success',
  LoginError = '[auth] Login error',
  LoginSuccess = '[auth] Login success',
  Logout = '[auth] Logout',
  LogoutError = '[auth] Logout error',
  LogoutSuccess = '[auth] Logout success',
  LoginRedirect = '[auth] Login redirect',
  DashboardRedirect = '[auth] Dashboard redirect',
  LogoutRemote = '[auth] Logout by remote event',
  FirstLoginAfterRegistration = '[auth] First login and redirect after registration',
  UpdateFirstTimeLoginStatus = '[auth] First login and redirect update status',
}

export class LoginAction implements Action {
  public readonly type = AuthActionTypes.Login;

  constructor(public payload: LoginCredentials) {}
}

export class LoginModalAction implements Action {
  public readonly type = AuthActionTypes.LoginFromModal;

  constructor(public payload: LoginCredentials) {}
}

export class LoginErrorAction implements Action {
  public readonly type = AuthActionTypes.LoginError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}
export class LoginModalSuccessAction implements Action {
  public readonly type = AuthActionTypes.LoginFromModalSuccess;
}

export class LoginSuccessAction implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: GetSessionWithAccount) {}
}

export class LogoutAction implements Action {
  public readonly type = AuthActionTypes.Logout;
}
export class LogoutErrorAction implements Action {
  public readonly type = AuthActionTypes.LogoutError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
}
export class LogoutSuccessAction implements Action {
  public readonly type = AuthActionTypes.LogoutSuccess;
}
export class LoginRedirectAction implements Action {
  public readonly type = AuthActionTypes.LoginRedirect;
}
export class DashboardRedirectAction implements Action {
  public readonly type = AuthActionTypes.DashboardRedirect;

  constructor(public payload: GetSessionWithAccount) {}
}
export class LogoutRemoteAction implements Action {
  public readonly type = AuthActionTypes.LogoutRemote;
}
export class FirstLoginAfterRegistrationAction implements Action {
  public readonly type = AuthActionTypes.FirstLoginAfterRegistration;
}
export class UpdateFirstTimeLoginStatusAction implements Action {
  public readonly type = AuthActionTypes.UpdateFirstTimeLoginStatus;
}

export type AuthActionsUnion =
  | LoginAction
  | LoginErrorAction
  | LoginSuccessAction
  | LoginRedirectAction
  | LogoutAction
  | LogoutErrorAction
  | LogoutSuccessAction
  | DashboardRedirectAction
  | FirstLoginAfterRegistrationAction
  | UpdateFirstTimeLoginStatusAction
  | LoginModalAction
  | LoginModalSuccessAction
  | LogoutRemoteAction;
