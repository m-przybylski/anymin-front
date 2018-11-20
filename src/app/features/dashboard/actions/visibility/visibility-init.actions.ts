// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum VisibilityInitActionTypes {
  FetchInitVisilbility = '[INIT Navbar] init visibility',
}

export class FetchInitVisilbilityAction implements Action {
  public readonly type = VisibilityInitActionTypes.FetchInitVisilbility;
}

export type VisilbilityInitActionsUnion = FetchInitVisilbilityAction;
