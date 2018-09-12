import { Action } from '@ngrx/store';
import { LoginCredentials, GetSessionWithAccount } from '@anymind-ng/api';

export enum AuthActionTypes {
  Login = '[auth] Login',
  LoginError = '[auth] Login error',
  LoginSuccess = '[auth] Login success',
  Logout = '[auth] Logout',
  LogoutError = '[auth] Logout error',
  LogoutSuccess = '[auth] Logout success',
  LoginRedirect = '[auth] Login redirect',
  DashboardRedirect = '[auth] Dashboard redirect',
}

export class LoginAction implements Action {
  public readonly type = AuthActionTypes.Login;

  constructor(public payload: LoginCredentials) {}
}
export class LoginErrorAction implements Action {
  public readonly type = AuthActionTypes.LoginError;

  // tslint:disable-next-line:no-any
  constructor(public payload: any) {}
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
export class DashboardRedurectAction implements Action {
  public readonly type = AuthActionTypes.DashboardRedirect;
}

export type AuthActionsUnion =
  | LoginAction
  | LoginErrorAction
  | LoginSuccessAction
  | LoginRedirectAction
  | LogoutAction
  | LogoutErrorAction
  | LogoutSuccessAction
  | DashboardRedurectAction;
