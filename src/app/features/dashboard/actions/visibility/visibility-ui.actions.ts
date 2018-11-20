// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum VisibilityUiActionTypes {
  SetUiVisilbilityVisible = '[UI Navbar] set visibility visible',
  SetUiVisilbilityInvisible = '[UI Navbar] set visibility invisible',
}

export class SetUiVisilbilityVisibleAction implements Action {
  public readonly type = VisibilityUiActionTypes.SetUiVisilbilityVisible;
}

export class SetUiVisilbilityInvisibleAction implements Action {
  public readonly type = VisibilityUiActionTypes.SetUiVisilbilityInvisible;
}

export type VisilbilityUiActionsUnion = SetUiVisilbilityVisibleAction | SetUiVisilbilityInvisibleAction;
