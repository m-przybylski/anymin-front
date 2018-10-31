// tslint:disable:cyclomatic-complexity
import { GetSessionWithAccount } from '@anymind-ng/api';
import { SessionActions, AuthActions } from '@platform/core/actions';

export interface IState {
  isFromBackend: boolean;
  isPending: boolean;
  session?: GetSessionWithAccount;
  // tslint:disable-next-line:no-any
  error?: any;
}

export const initialState: IState = {
  isFromBackend: false,
  isPending: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action: SessionActions.FetchActionsUnion | AuthActions.AuthActionsUnion,
): IState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.Login:
    case SessionActions.SessionActionTypes.FetchSessionFromServer: {
      return {
        ...state,
        session: undefined,
        isPending: true,
        isFromBackend: false,
      };
    }
    case AuthActions.AuthActionTypes.LoginSuccess:
    case SessionActions.SessionActionTypes.FetchSessionFromServerSuccess: {
      return {
        ...state,
        session: action.payload,
        isFromBackend: true,
        isPending: false,
      };
    }

    case AuthActions.AuthActionTypes.LoginError:
    case SessionActions.SessionActionTypes.FetchSessionFromServerError: {
      return {
        ...state,
        session: undefined,
        error: action.payload,
        isFromBackend: true,
        isPending: false,
      };
    }

    case AuthActions.AuthActionTypes.Logout: {
      return {
        ...state,
        isPending: true,
      };
    }

    case AuthActions.AuthActionTypes.LogoutSuccess: {
      return {
        ...state,
        session: undefined,
        isFromBackend: true,
        isPending: false,
      };
    }

    case AuthActions.AuthActionTypes.LogoutRemote: {
      return {
        ...state,
        session: undefined,
        isFromBackend: true,
        isPending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: IState): boolean => state.isPending;
export const getSession = (state: IState): GetSessionWithAccount | undefined => state.session;
export const getFromBackend = (state: IState): boolean => state.isFromBackend;
