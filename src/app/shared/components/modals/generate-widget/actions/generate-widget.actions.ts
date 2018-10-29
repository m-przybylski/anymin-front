import { Action } from '@ngrx/store';

export enum GenerateWidgetActionTypes {
  FetchWidgetId = '[Generate Widget] Fetch Widget Id',
  StartOpenGenerateWidgetModal = '[Generate Widget] Start open generate widget',
  OpenGenerateWidgetModal = '[Generate Widget] Open generate widget',
  FetchWidgetIdSuccess = '[Generate Widget] Fetch Widget Id Success',
  FetchWidgetIdFailure = '[Generate Widget] Fetch Widget Id Failure',
}
// tslint:disable:max-classes-per-file

export class FetchWidgetIdAction implements Action {
  public readonly type = GenerateWidgetActionTypes.FetchWidgetId;
  constructor(public payload: { expertId: string; serviceId: string }) {}
}

export class StartOpenGenerateWidgetAction implements Action {
  public readonly type = GenerateWidgetActionTypes.StartOpenGenerateWidgetModal;
  constructor(public payload: { expertId?: string; serviceId: string }) {}
}

export class OpenGenerateWidgetAction implements Action {
  public readonly type = GenerateWidgetActionTypes.OpenGenerateWidgetModal;
  constructor(public payload: { expertId?: string; serviceId: string; widgetId: string }) {}
}

export class FetchWidgetIdSuccessAction implements Action {
  public readonly type = GenerateWidgetActionTypes.FetchWidgetIdSuccess;

  constructor(public payload: { expertId: string; serviceId: string; widgetId: string }) {}
}

export class FetchWidgetIdErrorAction implements Action {
  public readonly type = GenerateWidgetActionTypes.FetchWidgetIdFailure;

  // tslint:disable-next-line:no-any
  constructor(public error: any) {}
}

export type GenerateWidgetActionsUnion =
  | FetchWidgetIdAction
  | StartOpenGenerateWidgetAction
  | OpenGenerateWidgetAction
  | FetchWidgetIdSuccessAction
  | FetchWidgetIdErrorAction;
