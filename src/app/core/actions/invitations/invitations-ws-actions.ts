// tslint:disable:max-classes-per-file

import { Action } from '@ngrx/store';

export enum InvitaionsWsActionTypes {
  IncrementInvitationsCounter = '[WS] Increment invitations counter',
}

export class IncrementWsInvitationsCounterAction implements Action {
  public readonly type = InvitaionsWsActionTypes.IncrementInvitationsCounter;
}

export type InvitationsWsActionsUnion = IncrementWsInvitationsCounterAction;
