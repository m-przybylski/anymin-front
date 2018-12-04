import { NavbarActions } from '@platform/core/actions';
import { NavbarActionTypes } from '@platform/core/actions/navbar.actions';

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

// tslint:disable-next-line:only-arrow-functions
export function reducer(state = initialState, action: NavbarActions.NavbarActionsUnion): IState {
  switch (action.type) {
    case NavbarActionTypes.SetUserType: {
      return {
        ...state,
        userType: action.payload,
      };
    }

    case NavbarActionTypes.UpdateSessionAndUserType: {
      return {
        ...state,
        userType: action.payload,
      };
    }

    case NavbarActionTypes.ToggleUserMenuVisibility: {
      return {
        ...state,
        isNavbarUserMenuVisible: !state.isNavbarUserMenuVisible,
      };
    }

    case NavbarActionTypes.ToggleHelpMenuVisibility: {
      return {
        ...state,
        isNavbarHelpMenuVisible: !state.isNavbarHelpMenuVisible,
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
