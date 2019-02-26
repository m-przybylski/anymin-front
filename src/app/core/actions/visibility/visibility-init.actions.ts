// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum VisibilityInitActionTypes {
  FetchInitVisibility = '[INIT Navbar] init visibility',
}

export class FetchInitVisibilityAction implements Action {
  public readonly type = VisibilityInitActionTypes.FetchInitVisibility;
}

export type VisibilityInitActionsUnion = FetchInitVisibilityAction;
