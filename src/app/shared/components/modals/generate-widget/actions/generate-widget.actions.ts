import { Action } from '@ngrx/store';

export enum GenerateWidgetActionTypes {
  OpenGenerateWidgetModal = '[Generate Widget] Open generate widget',
}

export class StartOpenGenerateWidgetAction implements Action {
  public readonly type = GenerateWidgetActionTypes.OpenGenerateWidgetModal;
  constructor(public payload: { expertId?: string; serviceId: string; shareLink: string }) {}
}

export type GenerateWidgetActionsUnion = StartOpenGenerateWidgetAction;
