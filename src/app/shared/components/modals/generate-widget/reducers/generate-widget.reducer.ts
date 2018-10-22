import * as GenerateWidgetActions from '../actions/generate-widget.actions';
import * as fromRoot from '@platform/reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface IGenerateWidgetState {
  expertId?: string;
  serviceId?: string;
  widgetId?: string;
  fetchWidgetIdPending: boolean;
}

export interface IState extends fromRoot.IState {
  generateWidget: IGenerateWidgetState;
}

export const initialState: IGenerateWidgetState = {
  fetchWidgetIdPending: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action: GenerateWidgetActions.GenerateWidgetActionsUnion,
): IGenerateWidgetState {
  switch (action.type) {
    case GenerateWidgetActions.GenerateWidgetActionTypes.StartOpenGenerateWidgetModal:
    case GenerateWidgetActions.GenerateWidgetActionTypes.FetchWidgetId: {
      return { ...state, fetchWidgetIdPending: true };
    }
    case GenerateWidgetActions.GenerateWidgetActionTypes.OpenGenerateWidgetModal:
    case GenerateWidgetActions.GenerateWidgetActionTypes.FetchWidgetIdSuccess: {
      return {
        ...state,
        expertId: action.payload.expertId,
        serviceId: action.payload.serviceId,
        widgetId: action.payload.widgetId,
        fetchWidgetIdPending: false,
      };
    }
    case GenerateWidgetActions.GenerateWidgetActionTypes.FetchWidgetIdFailure: {
      return { ...state, fetchWidgetIdPending: false };
    }
    default: {
      return state;
    }
  }
}
export const selectGenerateWidgetState = createFeatureSelector<IState, IGenerateWidgetState>('generateWidget');

export const getAll = createSelector(
  selectGenerateWidgetState,
  (state: IGenerateWidgetState): IGenerateWidgetState => state,
);

export const getExpertId = createSelector(
  selectGenerateWidgetState,
  (state: IGenerateWidgetState): string | undefined => state.expertId,
);
export const getServiceID = createSelector(
  selectGenerateWidgetState,
  (state: IGenerateWidgetState): string | undefined => state.serviceId,
);
export const getWidgetId = createSelector(
  selectGenerateWidgetState,
  (state: IGenerateWidgetState): string | undefined => state.widgetId,
);
