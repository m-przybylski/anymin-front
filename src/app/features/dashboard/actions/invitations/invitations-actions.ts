// tslint:disable:max-classes-per-file

import { Action } from '@ngrx/store';

export enum InvitationsActionTypes {
  FetchInvitations = '[API Navbar] Fetch invitations list',
}

export class FetchInvitationsAction implements Action {
  public readonly type = InvitationsActionTypes.FetchInvitations;
}

export type InvitationsActionsUnion = FetchInvitationsAction;
