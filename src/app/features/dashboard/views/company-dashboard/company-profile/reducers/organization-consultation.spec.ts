import { reducer, IState } from './organization-consultation';
import { CompanyConsultationPageActions, CompanyConsultationApiActions } from '../actions';
import { DeepPartial } from 'testing/testing';

const initialState: IState = {
  isLoading: false,
  isInviteLoading: false,
};

describe('company consultation reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadConsultationsAction', () => {
    it('should start loading consultations', () => {
      const result = reducer(
        initialState,
        new CompanyConsultationPageActions.LoadConsultationsAction({
          serviceId: 'fake serviceId',
          getSessionWithAccount: undefined,
        }),
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadConsultationSuccessAction', () => {
    it('should update state', () => {
      const state = {
        isLoading: true,
        isInviteLoading: false,
      };
      const result = reducer(
        state,
        new CompanyConsultationApiActions.LoadConsultationSuccessAction('fake payload' as any),
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('ClearAction', () => {
    it('should update state', () => {
      const state: any = {
        isLoading: false,
        isInviteLoading: false,
        organizationConsultation: 'fake consultation',
        pendingInvitations: [],
      };
      const result = reducer(state, new CompanyConsultationPageActions.ClearAction());
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadConsultationFailureAction', () => {
    it('should update state', () => {
      const state = {
        isLoading: true,
        isInviteLoading: false,
      };
      const result = reducer(
        state,
        new CompanyConsultationApiActions.LoadConsultationFailureAction('fake error' as any),
      );
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadInvitesAction', () => {
    it('should update state', () => {
      const state = {
        isLoading: false,
        isInviteLoading: false,
      };
      const result = reducer(state, new CompanyConsultationPageActions.LoadPendingInvitesAction('fake service'));
      expect(result).toMatchSnapshot();
    });
  });
  describe('LoadInvitesSuccessAction', () => {
    it('should update state', () => {
      const state = {
        isLoading: true,
        isInviteLoading: false,
      };
      const result = reducer(state, new CompanyConsultationApiActions.LoadInvitesSuccessAction('fake invites' as any));

      expect(result).toMatchSnapshot();
    });
  });

  describe('DeleteEmployment', () => {
    it('should update state', () => {
      const state: DeepPartial<IState> = {
        isLoading: true,
        isInviteLoading: false,
        organizationConsultation: {
          employeesList: [
            {
              id: '1234',
            },
            {
              id: '2345',
            },
            {
              id: '3456',
            },
          ],
        },
      };
      const result = reducer(
        state as any,
        new CompanyConsultationApiActions.DeleteEmploymentSuccessAction('1234' as any),
      );

      expect(result.organizationConsultation && result.organizationConsultation.employeesList.length).toBe(2);
    });
  });
});
