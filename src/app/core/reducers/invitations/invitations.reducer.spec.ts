import { IState, reducer } from '../../../core/reducers/invitations/invitations.reducer';
import { InvitationsApiActions, InvitationsWsActions, InvitationsActions } from '../../../core/actions/index';

describe('invitations.reducer', () => {
  const initialState: IState = {
    counter: 0,
    isPending: false,
  };

  describe('undefined Action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);
      expect(result).toEqual(initialState);
    });
  });

  describe('FetchApiInvitationsAction', () => {
    it('should start FetchApiInvitations action', () => {
      const response = reducer(initialState, new InvitationsActions.FetchInvitationsAction());

      const result = {
        counter: 0,
        isPending: true,
      };

      expect(response).toEqual(result);
    });
  });
  describe('FetchApiInvitationsSuccessAction', () => {
    it('should success', () => {
      const payload = 2;
      const response = reducer(initialState, new InvitationsApiActions.FetchApiInvitationsSuccessAction(payload));

      const result = {
        counter: 2,
        isPending: false,
      };

      expect(response).toEqual(result);
    });
  });

  describe('FetchApiInvitationsErrorAction', () => {
    it('should return error', () => {
      const response = reducer(initialState, new InvitationsApiActions.FetchApiInvitationsErrorAction());
      const result = initialState;
      expect(response).toEqual(result);
    });
  });

  describe('IncrementUiInvitationsCounterAction', () => {
    it('should increment invitationCounter', () => {
      const response = reducer(initialState, new InvitationsWsActions.IncrementWsInvitationsCounterAction());
      const result = { counter: 1, isPending: false };

      expect(response).toEqual(result);
    });
  });

  describe('DecrementApiInvitationsCounterAction', () => {
    it('should decrement invitationCounter', () => {
      const currentState: IState = {
        counter: 1,
        isPending: false,
      };

      const response = reducer(currentState, new InvitationsApiActions.DecrementApiInvitationsCounterAction());
      const result = { counter: 0, isPending: false };

      expect(response).toEqual(result);
    });
  });
});
