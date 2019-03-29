import { reducer, IState } from './organization-profile';
import { CompanyProfileApiActions, CompanyProfilePageActions } from '../actions';
import { ConsultationDetailActions } from '@platform/shared/components/modals/consultation-details/actions';

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
      const result = reducer(state, new CompanyProfilePageActions.AddConsultationAction(newConsultation));
      expect(result.organizationProfile && result.organizationProfile.profile.organization.services).toHaveLength(
        parseInt('2', 10),
      );
    });
  });
  describe('DeleteConsultationAction', () => {
    it('should delete existing consultation by its id', () => {
      const state: IState = {
        isLoading: false,
        organizationProfile: {
          isCompany: false,
          isLogged: false,
          isOwnProfile: false,
          profile: {
            profile: {} as any,
            organization: {
              isFavourite: false,
              organizationProfile: {} as any,
              services: [{ service: { id: '1' } }, { service: { id: '2' } }] as any,
            },
          },
        },
      };
      const consultationToDelete: any = '1';
      const action = new ConsultationDetailActions.DeleteConsultationAction(consultationToDelete);
      const result = reducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('EditConsultationAction', () => {
    it('should update existing consultation', () => {
      const state: IState = {
        isLoading: false,
        organizationProfile: {
          isCompany: false,
          isLogged: false,
          isOwnProfile: false,
          profile: {
            profile: {} as any,
            organization: {
              isFavourite: false,
              organizationProfile: {} as any,
              services: [
                { service: { id: '1', name: 'old name' } },
                { service: { id: '2', name: 'fake name' } },
              ] as any,
            },
          },
        },
      };
      const consultationToEdit: any = { id: '1', name: 'new name' };
      const action = new ConsultationDetailActions.EditConsultationAction(consultationToEdit);
      const result = reducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });
});
