// tslint:disable:cyclomatic-complexity
import { GetSessionWithAccount } from '@anymind-ng/api';
import {
  SessionActions,
  AuthActions,
  SessionUpdateApiActions,
  SessionApiActions,
  RegisterActions,
  RegisterApiActions,
  SetNewPasswordActions,
} from '@platform/core/actions';

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

type ActionsUnion =
  | SessionActions.FetchActionsUnion
  | AuthActions.AuthActionsUnion
  | SessionUpdateApiActions.SessionUpdateApiActionUnion
  | SessionApiActions.SessionAPIActionUnion
  | RegisterActions.RegisterActionsUnion
  | RegisterApiActions.RegisterAPIActionsUnion
  | SetNewPasswordActions.SetNewPasswordSuccessAction;

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: ActionsUnion): IState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.Login:
    case RegisterActions.RegisterActionsTypes.Register:
    case SessionActions.SessionActionTypes.FetchSessionFromServer: {
      return {
        ...state,
        isPending: true,
        isFromBackend: false,
      };
    }
    case AuthActions.AuthActionTypes.LoginSuccess:
    case RegisterApiActions.RegisterApiActionsTypes.RegisterSuccess:
    case SessionApiActions.SessionWithAccountApiActionTypes.VerifyAccountByPin:
    case SessionApiActions.SessionWithAccountApiActionTypes.VerifyAccountByEmail:
    case SessionApiActions.SessionWithAccountApiActionTypes.FetchSessionSuccess: {
      return {
        ...state,
        session: action.payload,
        isFromBackend: true,
        isPending: false,
      };
    }

    case SetNewPasswordActions.SetNewPasswordActionsTypes.SetNewPasswordSuccess: {
      return {
        ...state,
        session: action.payload.session,
        isFromBackend: true,
        isPending: false,
      };
    }

    case AuthActions.AuthActionTypes.LoginError:
    case RegisterApiActions.RegisterApiActionsTypes.RegisterError:
    case SessionApiActions.SessionWithAccountApiActionTypes.FetchSessionError: {
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

    case AuthActions.AuthActionTypes.LogoutRemote:
    case AuthActions.AuthActionTypes.LogoutSuccess: {
      return {
        ...state,
        session: undefined,
        isFromBackend: true,
        isPending: false,
      };
    }
    case SessionUpdateApiActions.SessionUpdateApiActionTypes.CreateUpdateNameAndAvatar: {
      if (state.session === undefined) {
        return state;
      }
      const newAccountDetails = {
        ...state.session.account.details,
        nickname: action.payload.name,
        avatar: action.payload.avatarToken,
      };
      const newAccount = { ...state.session.account, details: newAccountDetails };
      const newSession = { ...state.session, account: newAccount };

      return { ...state, session: newSession };
    }

    case SessionApiActions.SessionWithAccountApiActionTypes.UpdateAccount: {
      if (state.session === undefined) {
        return state;
      }

      return { ...state, session: { ...state.session, account: action.payload } };
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: IState): boolean => state.isPending;
export const getError = (state: IState): any | undefined => state.error;
export const getSession = (state: IState): GetSessionWithAccount | undefined => state.session;
export const getFromBackend = (state: IState): boolean => state.isFromBackend;
