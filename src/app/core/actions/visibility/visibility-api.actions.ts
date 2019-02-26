// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetExpertVisibility } from '@anymind-ng/api';

export enum VisibilityApiActionTypes {
  FetchInitVisibilitySuccess = '[API Navbar] init visibility SUCCESS',
  FetchInitVisibilityError = '[API Navbar] init visibility ERROR',
  SetUiVisibilityVisibleSuccess = '[API Navbar] set visibility visible SUCCESS',
  SetUiVisibilityVisibleError = '[API Navbar] set visibility visible ERROR',
  SetUiVisibilityInvisibleSuccess = '[API Navbar] set visibility invisible SUCCESS',
  SetUiVisibilityInvisibleError = '[API Navbar] set visibility invisible ERROR',
}

export class FetchApiVisibilitySuccessAction implements Action {
  public readonly type = VisibilityApiActionTypes.FetchInitVisibilitySuccess;

  constructor(public payload: GetExpertVisibility) {}
}

export class FetchApiVisibilityErrorAction implements Action {
  public readonly type = VisibilityApiActionTypes.FetchInitVisibilityError;
}

export class SetUiVisibilityVisibleSuccessAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisibilityVisibleSuccess;
}

export class SetUiVisibilityVisibleErrorAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisibilityVisibleError;
}

export class SetUiVisibilityInvisibleSuccessAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisibilityInvisibleSuccess;
}

export class SetUiVisibilityInvisibleErrorAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisibilityInvisibleError;
}

export type VisibilityApiActionsUnion =
  | FetchApiVisibilitySuccessAction
  | FetchApiVisibilityErrorAction
  | SetUiVisibilityVisibleSuccessAction
  | SetUiVisibilityVisibleErrorAction
  | SetUiVisibilityInvisibleSuccessAction
  | SetUiVisibilityInvisibleErrorAction;
