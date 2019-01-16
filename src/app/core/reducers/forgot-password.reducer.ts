import { ForgotPasswordActions } from '@platform/core/actions';

export interface IState {
  msisdnToken?: string;
}

export const initialState: IState = {};

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: ForgotPasswordActions.ForgotPasswordApiActionsUnion): IState {
  switch (action.type) {
    case ForgotPasswordActions.ForgotPasswordApiActionsTypes.SetMsisdnToken: {
      return {
        ...state,
        msisdnToken: action.payload,
      };
    }
    case ForgotPasswordActions.ForgotPasswordApiActionsTypes.DeleteMsisdnToken: {
      return {
        ...state,
        msisdnToken: undefined,
      };
    }

    default: {
      return state;
    }
  }
}

export const getMsisdnToken = (state: IState): string | undefined => state.msisdnToken;
