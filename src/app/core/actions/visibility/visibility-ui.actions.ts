// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum VisibilityUiActionTypes {
  SetUiVisibilityVisible = '[UI Navbar] set visibility visible',
  SetUiVisibilityInvisible = '[UI Navbar] set visibility invisible',
}

export class SetUiVisibilityVisibleAction implements Action {
  public readonly type = VisibilityUiActionTypes.SetUiVisibilityVisible;
}

export class SetUiVisibilityInvisibleAction implements Action {
  public readonly type = VisibilityUiActionTypes.SetUiVisibilityInvisible;
}

export type VisibilityUiActionsUnion = SetUiVisibilityVisibleAction | SetUiVisibilityInvisibleAction;
