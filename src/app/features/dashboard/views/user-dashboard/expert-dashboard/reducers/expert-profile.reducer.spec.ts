import { reducer, IState } from './index';
import { ExpertDashboardApiActions, ExpertDashboardActions } from '../actions';
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

  describe('Dupa', () => {
    it('should be Dupa', () => {
      expect('Dupa').toBe('Dupa');
    });
  });

  describe('LoadExpertDashboardAction', () => {
    it('should start loading data', () => {
      const action = new ExpertDashboardActions.LoadExpertDashboardAction('fake profile');
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('ReloadExpertDashboardAfterEditProfileAction', () => {
    it('should start reloading data', () => {
      const action = new ExpertDashboardActions.ReloadExpertDashboardAfterEditProfileAction('fake profile');
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadExpertDashboardSuccessAction', () => {
    it('should update store with profile data', () => {
      const profile: any = '👍👍👍';
      const action = new ExpertDashboardApiActions.LoadExpertDashboardSuccessAction(profile);
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadFailure', () => {
    it('should udpate store with error message', () => {
      const profile: any = '👍👍👍';
      const action = new ExpertDashboardApiActions.LoadExpertDashboardFailureAction(profile);
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('AddConsultationAction', () => {
    it('should not modify store when nothing in the store', () => {
      const newConsultation: any = 'fake consultation';
      const action = new ExpertDashboardActions.AddConsultationAction(newConsultation);
      const result = reducer(initialState, action);
      expect(result.expertProfile).toBeFalsy();
    });
    it('should add consultation to the store', () => {
      const state: IState = {
        isLoading: false,
        expertProfile: {
          isCompany: false,
          isLogged: false,
          isOwnProfile: false,
          profile: {
            expertProfileView: {
              employments: ['fake service'] as any,
              expertProfile: {} as any,
              isFavourite: false,
            },
            getProfileWithDocuments: {} as any,
          },
        },
      };
      const newConsultation: any = 'fake consultation';
      const action = new ExpertDashboardActions.AddConsultationAction(newConsultation);
      const result = reducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('DeleteConsultationAction', () => {
    it('should delete existing consultation by its id', () => {
      const state: IState = {
        isLoading: false,
        expertProfile: {
          isCompany: false,
          isLogged: false,
          isOwnProfile: false,
          profile: {
            expertProfileView: {
              employments: [
                { serviceDetails: { id: '3' } },
                { serviceDetails: { id: '4' } },
                { serviceDetails: { id: '5' } },
              ] as any,
              expertProfile: {} as any,
              isFavourite: false,
            },
            getProfileWithDocuments: {} as any,
          },
        },
      };
      const consultationToDelete: any = '3';
      const action = new ConsultationDetailActions.DeleteConsultationAction(consultationToDelete);
      const result = reducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });
  describe('EditConsultationAction', () => {
    it('should update existing consultation', () => {
      const state: IState = {
        isLoading: false,
        expertProfile: {
          isCompany: false,
          isLogged: false,
          isOwnProfile: false,
          profile: {
            expertProfileView: {
              employments: [
                { serviceDetails: { id: '3', name: 'old name' } },
                { serviceDetails: { id: '4', name: 'some not valid name' } },
                { serviceDetails: { id: '5', name: 'some not valid name' } },
              ] as any,
              expertProfile: {} as any,
              isFavourite: false,
            },
            getProfileWithDocuments: {} as any,
          },
        },
      };
      const consultationToEdit: any = { id: '3', name: 'new name' };
      const action = new ConsultationDetailActions.EditConsultationAction(consultationToEdit);
      const result = reducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });
});
