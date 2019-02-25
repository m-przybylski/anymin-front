import { reducer, IState } from './index';
import { CompanyProfileApiActions, CompanyProfilePageActions } from '../actions';

const initialState: IState = {
  isLoading: false,
};

describe('company profile reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('DeleteEmploymentSuccessAction action', () => {
    it('should remove expert from consultation', () => {
      const state = {
        isLoading: false,
        organizationProfile: {
          profile: {
            organization: {
              services: [
                {
                  service: {},
                  employments: [{ id: '1' }, { id: '2' }, { id: '3' }],
                },
                {
                  service: {},
                  employments: [{ id: '5' }, { id: '6' }, { id: '7' }],
                },
              ],
            },
          },
        },
      } as any;
      const result = reducer(state, new CompanyProfileApiActions.DeleteEmploymentSuccessAction('7'));
      expect(result).toMatchSnapshot();
    });
    it('should not throw when no data to remove', () => {
      const state = { isLoading: false } as any;
      const result = reducer(state, new CompanyProfileApiActions.DeleteEmploymentSuccessAction('7'));
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadProfileAction', () => {
    it('should start loading profile', () => {
      const result = reducer(initialState, new CompanyProfilePageActions.LoadProfileAction('fake profile'));
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadProfileActionSuccess', () => {
    it('should start loading profile', () => {
      const profile: any = '👍👍👍';
      const result = reducer({ isLoading: true }, new CompanyProfileApiActions.LoadProfileActionSuccess(profile));
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadProfileActionFailure', () => {
    it('should start loading profile', () => {
      const profile: any = '👍👍👍';
      const result = reducer({ isLoading: true }, new CompanyProfileApiActions.LoadProfileActionFailure(profile));
      expect(result).toMatchSnapshot();
    });
  });

  describe('UpdateProfileAction', () => {
    it('should start loading profile', () => {
      const result = reducer(initialState, new CompanyProfilePageActions.UpdateProfileAction('fake profile'));
      expect(result).toMatchSnapshot();
    });
  });
  describe('AddConsultation', () => {
    it('should append new consultation', () => {
      const state = {
        isLoading: false,
        organizationProfile: {
          profile: {
            organization: {
              services: ['fake service 1'],
            },
          },
        },
      } as any;
      const newConsultation: any = 'fake service 2';
      const result = reducer(state, new CompanyProfilePageActions.AddConsultation(newConsultation));
      expect(result.organizationProfile && result.organizationProfile.profile.organization.services).toHaveLength(2);
    });
  });
});
