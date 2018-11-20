// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetExpertVisibility } from '@anymind-ng/api';

export enum VisibilityApiActionTypes {
  FetchInitVisilbilitySuccess = '[API Navbar] init visibility SUCCESS',
  FetchInitVisilbilityError = '[API Navbar] init visibility ERROR',
  SetUiVisilbilityVisibleSuccess = '[API Navbar] set visibility visible SUCCESS',
  SetUiVisilbilityVisibleError = '[API Navbar] set visibility visible ERROR',
  SetUiVisilbilityInvisibleSuccess = '[API Navbar] set visibility invisible SUCCESS',
  SetUiVisilbilityInvisibleError = '[API Navbar] set visibility invisible ERROR',
}

export class FetchApiVisilbilitySuccessAction implements Action {
  public readonly type = VisibilityApiActionTypes.FetchInitVisilbilitySuccess;

  constructor(public payload: GetExpertVisibility) {}
}

export class FetchApiVisilbilityErrorAction implements Action {
  public readonly type = VisibilityApiActionTypes.FetchInitVisilbilityError;
}

export class SetUiVisilbilityVisibleSuccessAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisilbilityVisibleSuccess;
}

export class SetUiVisilbilityVisibleErrorAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisilbilityVisibleError;
}

export class SetUiVisilbilityInvisibleSuccessAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisilbilityInvisibleSuccess;
}

export class SetUiVisilbilityInvisibleErrorAction implements Action {
  public readonly type = VisibilityApiActionTypes.SetUiVisilbilityInvisibleError;
}

export type VisilbilityApiActionsUnion =
  | FetchApiVisilbilitySuccessAction
  | FetchApiVisilbilityErrorAction
  | SetUiVisilbilityVisibleSuccessAction
  | SetUiVisilbilityVisibleErrorAction
  | SetUiVisilbilityInvisibleSuccessAction
  | SetUiVisilbilityInvisibleErrorAction;
