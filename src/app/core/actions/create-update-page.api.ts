// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';

export enum SessionUpdateApiActionTypes {
  CreateUpdateNameAndAvatar = '[create update session] Name and avatar',
}

export class CreateUpdateNameAndAvatarAction implements Action {
  public readonly type = SessionUpdateApiActionTypes.CreateUpdateNameAndAvatar;

  constructor(public payload: { name: string; avatarToken: string }) {}
}

export type SessionUpdateApiActionUnion = CreateUpdateNameAndAvatarAction;
