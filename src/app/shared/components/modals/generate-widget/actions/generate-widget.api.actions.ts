import { Action } from '@ngrx/store';

export enum GenerateWidgetApiActionTypes {
  FetchWidgetIdSuccess = '[Generate Widget] Fetch Widget Id Success',
  FetchWidgetIdFailure = '[Generate Widget] Fetch Widget Id Failure',
}
// tslint:disable:max-classes-per-file

export class FetchWidgetIdSuccessAction implements Action {
  public readonly type = GenerateWidgetApiActionTypes.FetchWidgetIdSuccess;

  constructor(public payload: { expertId?: string; serviceId: string; widgetId: string }) {}
}

export class FetchWidgetIdErrorAction implements Action {
  public readonly type = GenerateWidgetApiActionTypes.FetchWidgetIdFailure;

  // tslint:disable-next-line:no-any
  constructor(public error: any) {}
}

export type GenerateWidgetActionsUnion = FetchWidgetIdSuccessAction | FetchWidgetIdErrorAction;
