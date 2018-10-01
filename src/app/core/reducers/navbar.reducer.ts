import { NavbarActions } from '@platform/core/actions';
import { NavbarActionTypes } from '@platform/core/actions/navbar.actions';

export enum UserTypeEnum {
  USER,
  EXPERT,
  COMPANY,
}

export interface IState {
  userType: UserTypeEnum;
  isNavbarUserMenuVisible: boolean;
}

export const initialState: IState = {
  userType: UserTypeEnum.USER,
  isNavbarUserMenuVisible: false,
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

    default: {
      return state;
    }
  }
}

export const getUserType = (state: IState): UserTypeEnum => state.userType;
export const getIsNavbarUserMenuVisible = (state: IState): boolean => state.isNavbarUserMenuVisible;
