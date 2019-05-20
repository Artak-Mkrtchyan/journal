import { RouterReducerState } from '@ngrx/router-store';
import { initialPlayerState } from '@store/state/player.state';
import { initialUserState } from '@store/state/user.state';

import { IPlayer } from '@models/player.interface';
import { IUser } from '@models/user.interface';

export interface IAppState {
  router?: RouterReducerState;
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
