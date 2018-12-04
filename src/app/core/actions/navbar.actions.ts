// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { UserTypeEnum } from '@platform/core/reducers/navbar.reducer';

export enum NavbarActionTypes {
  SetUserType = '[navbar] set user type',
  UpdateSessionAndUserType = '[navbar] set user type and fetch session',
  ToggleUserMenuVisibility = '[navbar] toggle user menu visibility',
  ToggleHelpMenuVisibility = '[navbar] toggle help menu visibility',
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

export class ToggleHelpMenuVisibility implements Action {
  public readonly type = NavbarActionTypes.ToggleHelpMenuVisibility;
}

export type NavbarActionsUnion =
  | SetUserType
  | UpdateUserTypeAndSession
  | ToggleUserMenuVisibility
  | ToggleHelpMenuVisibility;
