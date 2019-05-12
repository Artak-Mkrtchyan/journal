import { IPlayer } from '@models/player.interface';
import { createSelector } from '@ngrx/store';

import { IAppState } from '@store/state/app.state';

const Player = (state: IAppState) => state.player;

export const selectPlayer = createSelector(
  Player,
  (state: IPlayer) => state
);

