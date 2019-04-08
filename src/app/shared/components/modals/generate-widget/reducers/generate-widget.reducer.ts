import { GenerateWidgetActions, GenerateWidgetApiActions } from '../actions';
import * as fromRoot from '@platform/reducers';

export interface IGenerateWidgetState {
  expertId?: string;
  serviceId?: string;
  widgetId?: string;
  shareUrl?: string;
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
  action: GenerateWidgetActions.GenerateWidgetActionsUnion | GenerateWidgetApiActions.GenerateWidgetActionsUnion,
): IGenerateWidgetState {
  switch (action.type) {
    case GenerateWidgetActions.GenerateWidgetActionTypes.OpenGenerateWidgetModal: {
      return {
        ...state,
        fetchWidgetIdPending: true,
        shareUrl: action.payload.shareLink,
      };
    }
    case GenerateWidgetApiActions.GenerateWidgetApiActionTypes.FetchWidgetIdSuccess: {
      return {
        ...state,
        expertId: action.payload.expertId,
        serviceId: action.payload.serviceId,
        widgetId: action.payload.widgetId,
        fetchWidgetIdPending: false,
      };
    }
    case GenerateWidgetApiActions.GenerateWidgetApiActionTypes.FetchWidgetIdFailure: {
      return { ...state, fetchWidgetIdPending: false };
    }
    default: {
      return state;
    }
  }
}
