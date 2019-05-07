import { initialPlayerState } from './player.state';
import { initialUserState } from './user.state';

import { IPlayer } from './../../models/player.interface';
import { IUser } from 'src/app/models/user.interface';

export interface IAppState {
  user: IUser;
  player: IPlayer;
}

export const initialAppState: IAppState = {
  user: initialUserState,
  player: initialPlayerState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
