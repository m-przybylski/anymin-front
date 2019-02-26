// tslint:disable:cyclomatic-complexity
import { NavbarActions, AuthActions, SessionApiActions } from '@platform/core/actions';
import { SessionAPIActionUnion } from '@platform/core/actions/session-api.actions';

export enum UserTypeEnum {
  USER,
  EXPERT,
  COMPANY,
}

export interface IState {
  userType?: UserTypeEnum;
  isNavbarUserMenuVisible: boolean;
  isNavbarHelpMenuVisible: boolean;
}

export const initialState: IState = {
  isNavbarUserMenuVisible: false,
  isNavbarHelpMenuVisible: false,
};

type ActionsUnion = NavbarActions.NavbarActionsUnion | AuthActions.AuthActionsUnion | SessionAPIActionUnion;

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: ActionsUnion): IState {
  switch (action.type) {
    case NavbarActions.NavbarActionTypes.UpdateSessionAndUserType:
    case NavbarActions.NavbarActionTypes.SetUserType: {
      return {
        ...state,
        userType: action.payload,
      };
    }

    case NavbarActions.NavbarActionTypes.ToggleUserMenuVisibility: {
      return {
        ...state,
        isNavbarUserMenuVisible: !state.isNavbarUserMenuVisible,
      };
    }

    case NavbarActions.NavbarActionTypes.ToggleHelpMenuVisibility: {
      return {
        ...state,
        isNavbarHelpMenuVisible: !state.isNavbarHelpMenuVisible,
      };
    }

    case AuthActions.AuthActionTypes.LogoutRemote:
    case AuthActions.AuthActionTypes.LogoutSuccess: {
      return {
        ...state,
        userType: undefined,
      };
    }

    case SessionApiActions.SessionWithAccountApiActionTypes.FetchSessionSuccess:
      let userType: UserTypeEnum;

      if (action.payload.isCompany) {
        userType = UserTypeEnum.COMPANY;
      } else if (action.payload.isExpert) {
        userType = UserTypeEnum.EXPERT;
      } else {
        userType = UserTypeEnum.USER;
      }

      return {
        ...state,
        userType,
      };

    default: {
      return state;
    }
  }
}

export const getUserType = (state: IState): UserTypeEnum | undefined => state.userType;
export const getIsNavbarUserMenuVisible = (state: IState): boolean => state.isNavbarUserMenuVisible;
export const getIsNavbarHelpMenuVisible = (state: IState): boolean => state.isNavbarHelpMenuVisible;
