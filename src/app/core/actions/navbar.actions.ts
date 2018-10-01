// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { UserTypeEnum } from 'app/core/reducers/navbar.reducer';

export enum NavbarActionTypes {
  SetUserType = '[navbar] set user type',
  UpdateSessionAndUserType = '[navbar] set user type and fetch session',
  ToggleUserMenuVisibility = '[navbar] toggle user menu visibility',
}

export class SetUserType implements Action {
  public readonly type = NavbarActionTypes.SetUserType;

  constructor(public payload: UserTypeEnum) {}
}

export class UpdateUserTypeAndSession implements Action {
  public readonly type = NavbarActionTypes.UpdateSessionAndUserType;

  constructor(public payload: UserTypeEnum) {}
}

export class ToggleUserMenuVisibility implements Action {
  public readonly type = NavbarActionTypes.ToggleUserMenuVisibility;
}

export type NavbarActionsUnion = SetUserType | UpdateUserTypeAndSession | ToggleUserMenuVisibility;
