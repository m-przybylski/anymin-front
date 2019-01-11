import { NavbarActions, AuthActions } from '@platform/core/actions';

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

type ActionsUnion = NavbarActions.NavbarActionsUnion | AuthActions.AuthActionsUnion;

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

    default: {
      return state;
    }
  }
}

export const getUserType = (state: IState): UserTypeEnum | undefined => state.userType;
export const getIsNavbarUserMenuVisible = (state: IState): boolean => state.isNavbarUserMenuVisible;
export const getIsNavbarHelpMenuVisible = (state: IState): boolean => state.isNavbarHelpMenuVisible;
