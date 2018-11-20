// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum VisibilityWSActionTypes {
  SetWSVisibilityVisible = '[Visibility WS] set visibility visible',
  SetWSVisibilityInvisible = '[Visibility WS] set visibility invisible',
}

export class SetWSVisibilityVisibleAction implements Action {
  public readonly type = VisibilityWSActionTypes.SetWSVisibilityVisible;
}

export class SetWSVisibilityInvisibleAction implements Action {
  public readonly type = VisibilityWSActionTypes.SetWSVisibilityInvisible;
}

export type VisibilityWSActionsUnion = SetWSVisibilityVisibleAction | SetWSVisibilityInvisibleAction;
