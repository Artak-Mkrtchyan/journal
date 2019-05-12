import { Action } from '@ngrx/store';

import { IUser } from '@models/user.interface';

export enum EUserActions {
  SetUser = '[User] Log In',
  RemoveUser = '[User] Log Out'
}

export class RemoveUser implements Action {
  readonly type = EUserActions.RemoveUser;
}

export class SetUser implements Action {
  readonly type = EUserActions.SetUser;

  constructor(public payload: IUser) {}
}

export type UserActions = SetUser | RemoveUser;
