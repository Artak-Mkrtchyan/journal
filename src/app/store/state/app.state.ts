import { RouterReducerState } from '@ngrx/router-store';

import { PlayerState } from '@store/state/player.state';
import { UserState } from '@store/state/user.state';
import { PlaylistState } from '@store/state/playlist.state';

import { IPlaylist } from '@models/playlist.interface';
import { IPlayer } from '@models/player.interface';
import { IUser } from '@models/user.interface';

export interface IAppState {
  router?: RouterReducerState;
  user: IUser;
  player: IPlayer;
  playlist: IPlaylist;
}

export const initialAppState: IAppState = {
  user: UserState,
  player: PlayerState,
  playlist: PlaylistState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
