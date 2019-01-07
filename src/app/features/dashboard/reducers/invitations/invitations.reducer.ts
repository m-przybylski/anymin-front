import { InvitationsApiActions, InvitationsWsActions, InvitationsActions } from '@platform/features/dashboard/actions';

export interface IState {
  counter: number;
  isPending: boolean;
}

export const initialState: IState = {
  counter: 0,
  isPending: false,
};

// tslint:disable-next-line:only-arrow-functions
export function reducer(
  state = initialState,
  action:
    | InvitationsApiActions.InvitationsApiActionsUnion
    | InvitationsWsActions.InvitationsWsActionsUnion
    | InvitationsActions.InvitationsActionsUnion,
): IState {
  switch (action.type) {
    case InvitationsActions.InvitationsActionTypes.FetchInvitations:
      return {
        ...state,
        isPending: true,
      };

    case InvitationsApiActions.InvitationsApiActionTypes.FetchApiInvitationsSucces:
      return {
        ...state,
        counter: action.payload,
        isPending: false,
      };

    case InvitationsApiActions.InvitationsApiActionTypes.FetchApiInvitationsError:
      return {
        ...state,
        isPending: false,
      };

    case InvitationsWsActions.InvitaionsWsActionTypes.IncrementInvitationsCounter:
      const incrementInvitationCounter = state.counter + 1;

      return {
        ...state,
        isPending: false,
        counter: incrementInvitationCounter,
      };

    case InvitationsApiActions.InvitationsApiActionTypes.DecrementInvitationsCounter:
      const decrementInvitationCounter = state.counter - 1;

      return {
        ...state,
        isPending: false,
        counter: decrementInvitationCounter,
      };

    default: {
      return state;
    }
  }
}

export const getInvitationCounter = (state: IState): number => state.counter;
