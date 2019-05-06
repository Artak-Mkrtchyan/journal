import { initialUserState } from './user.state';

import { IUser } from 'src/app/models/user.interface';

export interface IAppState {
  user: IUser;
}

export const initialAppState: IAppState = {
  user: initialUserState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
