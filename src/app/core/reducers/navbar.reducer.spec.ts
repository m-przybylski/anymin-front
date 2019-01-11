import { IState, reducer, UserTypeEnum } from './navbar.reducer';
import { AuthActions, NavbarActions } from '../actions';

describe('navbar.reducer', () => {
  const initialState: IState = {
    isNavbarHelpMenuVisible: false,
    isNavbarUserMenuVisible: false,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('SetUserType', () => {
    it('should set user type if no beginner state', () => {
      const result = reducer(initialState, new NavbarActions.SetUserType(UserTypeEnum.EXPERT));
      expect(result).toMatchSnapshot();
    });
    it('should update user type when state exists', () => {
      const state: IState = {
        isNavbarHelpMenuVisible: false,
        isNavbarUserMenuVisible: false,
        userType: UserTypeEnum.COMPANY,
      };
      const result = reducer(state, new NavbarActions.SetUserType(UserTypeEnum.EXPERT));
      expect(result).toMatchSnapshot();
    });
  });
  describe('UpdateSessionAndUserType', () => {
    it('should set user type if no beginner state', () => {
      const result = reducer(initialState, new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.EXPERT));
      expect(result).toMatchSnapshot();
    });
    it('should update user type when state exists', () => {
      const state: IState = {
        isNavbarHelpMenuVisible: false,
        isNavbarUserMenuVisible: false,
        userType: UserTypeEnum.COMPANY,
      };
      const result = reducer(state, new NavbarActions.UpdateUserTypeAndSession(UserTypeEnum.EXPERT));
      expect(result).toMatchSnapshot();
    });
  });
  describe('ToggleUserMenuVisibility', () => {
    it('should toggle menu visibility', () => {
      const result = reducer(initialState, new NavbarActions.ToggleUserMenuVisibility());

      expect(result).toMatchSnapshot();
    });
  });
  describe('ToggleHelpMenuVisibility', () => {
    it('should toggle help visibility', () => {
      const result = reducer(initialState, new NavbarActions.ToggleHelpMenuVisibility());

      expect(result).toMatchSnapshot();
    });
  });

  describe('LogoutSuccess', () => {
    it('should remove userType once logout', () => {
      const state: any = {
        userType: UserTypeEnum.COMPANY,
      };
      const result = reducer(state, new AuthActions.LogoutSuccessAction());

      expect(result).toMatchSnapshot();
    });
  });

  describe('LogoutRemote', () => {
    it('should remove userType once logout', () => {
      const state: any = {
        userType: UserTypeEnum.COMPANY,
      };
      const result = reducer(state, new AuthActions.LogoutRemoteAction());

      expect(result).toMatchSnapshot();
    });
  });
});
